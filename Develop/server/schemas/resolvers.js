const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');
//take username email and userid converted into encryption - hides users information 

const { User } = require("../models");
const { deleteBook } = require("../controllers/user-controller");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
        //only use populate when there are multi modules
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation:{
    login: async(parent,{email,password}) => {
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (!user) {
        throw new AuthenticationError("Can't find this user" );

        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError('Wrong password!' )
        }
        const token = signToken(user)
        return { token, user };
    },
    addUser: async(parent,{username,email,password},context ) => {

        const user = await User.create({username,email,password});

        if (!user) {

        throw new AuthenticationError('Something is wrong!' )
        }
        const token = signToken(user);
        return { token, user };

    },
    saveBook:async(parent,{authors,description, title,image,link  },context) =>{

        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: {authors,description, title,image,link } } },
            { new: true, runValidators: true }
          );
          if(!updatedUser) {
            return res.status(404).json({message:"Couldn't find user with this id!"})
          }
    },

    removeBook:async(parent,{bookId},context)=>{
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: {bookId } } },
        { new: true }
      );
      if(!updatedUser) {
        return res.status(404).json({message:"Couldn't find user with this id!"})
      }
    }

  },
};

module.exports = resolvers;

//graphql at the client side 