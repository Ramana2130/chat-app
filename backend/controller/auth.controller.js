import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndCookie from '../utils/generateToken.js';
export const signupUser = async (req, res) =>{
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password does'nt Match"})
        }

        const user = await User.findOne({username})

        if(user) {
            return res.status(400).json({error: "Username already exists"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        //profile
        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender, 
            profile_pic: gender === "male" ? boyProfile : girlProfile
        })

        if(newUser) {
            //generate token 
            await generateTokenAndCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profile_pic: newUser.profile_pic
            })
        }

        else {
            res.status(400).json({error: "Invalid User data"})
        }

    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Username or Password"})
        }

        generateTokenAndCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            profile_pic: user.profile_pic
        })
    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
};

export const logoutUser = async(req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({error: "Logout Out Successfully"})
    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}