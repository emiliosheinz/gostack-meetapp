import * as Yup from 'yup'

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string().min(8),
    passwordConfirmation: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
    oldPassword: Yup.string().when('password', (password, field) =>
      password ? field.required() : field
    ),
  })

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      message: 'Validation failed, there are missing or wrong parameters.',
    })
  }

  return next()
}
