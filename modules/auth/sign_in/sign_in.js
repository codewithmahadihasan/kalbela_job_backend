const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
const { response_sender } = require("../../hooks/respose_sender");
const { user_collection } = require("../../../collection/collections/auth");
const { workspace_collection } = require("../../../collection/collections/system");

const sign_in = async (req, res, next) => {
      try {
            const input_data = req.body;

            // Validate that necessary fields are present
            if (!input_data.email || !input_data.password) {
                  return response_sender({
                        res,
                        status_code: 400,
                        error: true,
                        data: null,
                        message: "Email and password are required.",
                  });
            }

            // Find the user by email
            const find_user = await user_collection.findOne({ email: input_data.email });


            if (!find_user) {
                  return response_sender({
                        res,
                        status_code: 400,
                        error: true,
                        data: null,
                        message: "Email is not registered.",
                  });
            }


            const isPasswordValid = await bcrypt.compare(input_data.password, find_user.password);
            if (!isPasswordValid) {
                  return response_sender({
                        res,
                        status_code: 401,
                        error: true,
                        data: null,
                        message: "Password is incorrect. Please try again.",
                  });
            }

            const workspace = await workspace_collection.findOne({ _id: new ObjectId(find_user.workspace_id) });

            delete workspace.staff

            const { password, ...userData } = find_user;
            console.log(userData);


            return response_sender({
                  res,
                  status_code: 200,
                  error: false,
                  data: {
                        user: userData,
                        workspace: workspace,

                  },
                  message: "User signed in successfully.",
            });

      } catch (error) {
            next(error);
      }
};


const sign_out = async (req, res, next) => {



      try {
            res.clearCookie('erp_user');
            res.clearCookie('erp_workspace');
            return response_sender({
                  res,
                  status_code: 200,
                  error: false,
                  data: null,
                  message: "User signed out successfully.",
            });

      } catch (error) {
            next(error);
      }
};

module.exports = {
      sign_in, sign_out
};
