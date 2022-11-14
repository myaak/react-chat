import Yup = require('yup')

const formSchema = Yup.object({
  email: Yup.string()
    .required("Username required!")
    .min(6, "Username too short!")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required!")
    .min(6, "Password too short!")
    .max(28, "Password too long!"),
})

const validateForm = (req:any) => {
    const formData = req.body
    formSchema.validate(formData)
    .catch(err => {
        console.log(err.error)
    })
    .then(valid => valid ? console.log('ok') : console.log('bad'))
}


export {validateForm}
