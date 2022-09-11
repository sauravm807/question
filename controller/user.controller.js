const { faker } = require("@faker-js/faker");
const userModel = require("../model/user.model");
const bcryptService = require("../services/bcrypt.service");
const jwtService = require("../services/jwt.service");

class UserController {
    /**
     * createMultipleRandomEmployees -- to create multiple random employees
     * @param {*} req 
     * @param {*} res 
     */
    async createMultipleRandomEmployees(req, res) {
        try {
            const employees = [];
            for (let i = 0; i < 200; i++) {
                const name = faker.name.fullName(); // create random fullnames

                const email = faker.internet.email(name); // create email from fullname

                const password = await bcryptService.encryptPassword(email); // create encrypted password equals to email

                const address = `${faker.address.buildingNumber()} ${faker.address.cardinalDirection()} ${faker.address.cityName()}`; // create random address

                const ph = faker.phone.number('+91 #### ### ###');  // create random phone number 
                employees.push([email, password, name, ph, address]);
            }

            const insertData = await userModel.createMultipleEmployeesDb(employees);
            if (insertData.affectedRows > 0) return res.status(200).json({
                code: 200,
                message: 'Users inserted successfully.'
            });

            res.status(400).json({
                code: 400,
                message: "Employees not inserted."
            });
        } catch (error) {
            res.send(error)
        }
    }

    /**
     * getAllEmployees -- to get all employees details
     * @param {*} req 
     * @param {*} res 
     */
    async getAllEmployees(req, res) {
        try {
            const userData = await userModel.getAllEmployees();
            if (!userData.length) return res.status(400).json({
                code: 400,
                message: "No employee found"
            });

            res.status(200).json({
                code: 200,
                message: 'Employees fetched successfully.',
                data: userData
            });
        } catch (error) {
            res.send(error)
        }
    }

    /**
     * searchEmployees -- to search employees by name or email
     * @param {*} req 
     * @param {*} res 
     */
    async searchEmployees(req, res) {
        try {
            const { searchText } = req.body;
            const userData = await userModel.searchEmployees(searchText);
            if (!userData.length) return res.status(400).json({
                code: 400,
                message: "No employee found"
            });

            res.status(200).json({
                code: 200,
                message: 'Employees fetched successfully.',
                data: userData
            });
        } catch (error) {
            res.send(error)
        }
    }

    /**
     * getAllEmployeesSorted -- to get list of employees sorted by name
     * @param {*} req 
     * @param {*} res 
     */
    async getAllEmployeesSorted(req, res) {
        try {
            const { searchText } = req.body;
            const userData = await userModel.getEmployeesSorted(searchText);
            if (!userData.length) return res.status(400).json({
                code: 400,
                message: "No employee found"
            });

            res.status(200).json({
                code: 200,
                message: 'Employees fetched successfully.',
                data: userData
            });
        } catch (error) {
            res.send(error)
        }
    }

    async getEmployeesByPage(req, res) {
        try {
            const { page } = req.params;
            if (!Number(page)) return res.status(400).json({
                code: 400,
                message: "Invalid page number."
            });

            let offset = 0;
            if (page > 1) offset = (page - 1) * 10;
            const limit = 10;

            const userData = await userModel.getEmployeesBypageNo({ offset, limit });
            if (!userData.length) return res.status(400).json({
                code: 400,
                message: "No employee found"
            });

            res.status(200).json({
                code: 200,
                message: 'Employees fetched successfully.',
                data: userData
            });
        } catch (error) {
            res.send(error)
        }
    }

    async employeeLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({
                code: 400,
                message: "Email and password are required."
            });

            const [userData] = await userModel.getEmployeeByEmail(email);
            if (!userData) return res.status(400).json({
                code: 400,
                message: "Email not found."
            });

            const hash = userData.password;
            const isMatched = await bcryptService.comparePassword({ password, hash });
            if (!isMatched) return res.status(400).json({
                code: 400,
                message: "Incorrect password."
            });

            const token = await jwtService.createToken({
                id: userData.id,
                email: userData.email,
                name: userData.name
            });

            if (!token) return res.status(400).json({
                code: 400,
                message: "something went wrong while creating token."
            });

            res.status(200).json({
                code: 200,
                message: "login successfull.",
                token: token
            });
        } catch (error) {
            res.send(error)
        }
    }

    async updateEmployee(req, res) {
        try {
            let { email, name, address, phone, password } = req.body;
            const { id } = req.user;

            if (password) password = await bcryptService.encryptPassword(password);

            let updateEmployeeDb = await userModel.updateEmployee({ id, email, name, address, phone, password });
            console.log(updateEmployeeDb);
            if (updateEmployeeDb) return res.status(200).json({
                code: 200,
                message: "Employee updated successfully"
            });

            res.status(400).json({
                code: 400,
                message: "Something went wrong."
            });
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}



module.exports = new UserController;