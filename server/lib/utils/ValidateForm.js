"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = void 0;
var Yup = require("yup");
var formSchema = Yup.object({
    email: Yup.string()
        .required("Username required!")
        .min(6, "Username too short!")
        .max(28, "Username too long!"),
    password: Yup.string()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
});
var validateForm = function (req) {
    var formData = req.body;
    formSchema.validate(formData)
        .catch(function (err) {
        console.log(err.error);
    })
        .then(function (valid) { return valid ? console.log('ok') : console.log('bad'); });
};
exports.validateForm = validateForm;
