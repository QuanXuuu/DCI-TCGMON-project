import User from "../models/User.js";

export const createUser = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;
		const newUser = new User({
			id: username.toLowerCase(),
			username,
			email,
			role,
		});
		newUser.password = newUser.encryptPassword(password);

		await newUser.save();
		res.status(201).json({
			success: true,
			message: `New user ${newUser.email} created`,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({
			success: false,
			message: `Server error: ${{ error }}`,
		});
	}
};

export const getUser = async (req, res) => {
	try {
		const response = await User.findOne({ id: req.params.id });
		res.status(200).json(response);
	} catch (error) {
		console.log({ error });
		res.status(500).json({
			success: false,
			message: `Server error: ${{ error }}`,
		});
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const response = await User.find();
		res.status(200).json({
			success: true,
			data: { response },
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({
			success: false,
			message: `Server error: ${{ error }}`,
		});
	}
};

export const updateUser = async (req, res) => {
	try {
		const response = await User.findOne({ id: req.params.id });
		const { collections } = req.body;
		response.collections = collections;
		await response.save();

		res.status(200).json({
			success: true,
			message: "User data successfully updated",
			data: response,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({
			success: false,
			message: `Server error: ${{ error }}`,
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: "User deleted",
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({
			success: false,
			message: `Server error: ${{ error }}`,
		});
	}
};

export const deleteAllUsers = async (req, res) => {
	try {
		await User.deleteMany();
		res.status(200).json({
			success: true,
			message: "All users deleted",
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({
			success: false,
			message: `Server error: ${{ error }}`,
		});
	}
};
