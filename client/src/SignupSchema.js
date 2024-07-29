import * as Yup from 'yup'


const SignupSchema = Yup.object().shape({
    username: Yup.string()
    .min(5, 'at least 5 characters')
    .required('username is required'),

    password: Yup.string()
    .min(8, 'minimum 8 characters')
    .max(20 , 'maximum 20 characters')
    .required('password is required'),
})

export default SignupSchema;

/*
const message = 'i went to  Viewpoint to study about Programing '


let i = /[a-z ]{1,200}$/i
const x = i.exec(message)
const r = i.test(message)
const m = message.match(i)
const as = assert(message===i,"not good")
console.log(m)


const myChecker = {
  validations: [],

  string: function () {
    this.validations.push('string')
    return this
  },

  number: function () {
    this.validations.push('number')
    return this
  },
  long: function (i) {
    this.validations.push({ length: i })
    return this
  },

  valid: function (str) {
    for (let vali of this.validations) {
      if (vali === 'string' || vali === 'number'){
        assert(typeof (str) === vali, "this is not a num or string")

      }
      if (typeof vali === "object") {
        assert(str.length === vali.length, `the input is not ${vali.length} length`)
      }
    }
    return this
  }
}


ourYup.string().long(3).valid("gfg")*/
