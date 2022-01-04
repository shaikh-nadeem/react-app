import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { API_BASE_URL } from '../../config/Constant';

function Login() {
  // const initialValues = {
  //   name: "",
  //   email: "",
  //   country: "",
  //   mobile: "",
  //   password: "",
  //   cpassword: "",
  //   security: "",
  //   terms:"",
  //   items: ""
  // };

  const [values, setValues] = React.useState({
    name: '',
    email: "",
    country: "",
    mobile: "",
    password: "",
    cpassword: "",
    security: "",
    terms:false,
    items: ""
  });

  const [lists, setLists] = useState([]);
  const [, forceUpdate] = useState()  
  const [checkerr, setCheckErr] = useState('');
  const simpleValidator = useRef(new SimpleReactValidator())

  React.useEffect(() => {
    async function getCharacters() {
      const response = await fetch("https://php.betadelivery.com/jpmd/api/get_countries");
      const body = await response.json();
      setLists(body.data);
    }
    getCharacters();

  }, []);

  const handleInputChange = name => event => {
    const { name, value } = event.target;
    // console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckClick = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values, u_check: !values.u_check });

    if(values.u_check === true){
        setCheckErr('Please agree to terms & conditions');
        return false;
    }else{
        setCheckErr(''); 
        return true;
    }
  }

  const validator = new SimpleReactValidator({
    className: 'text-danger',
    messages: {
      email: 'That is not an email.',
    },
    validators: {
      ip: {
        message: 'The :attribute must be a valid IP address.',
        rule: function(val, params, validator) { 
          return validator.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && params.indexOf(val) === -1
        }
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    }else{
      console.log('form valid');
    }
  }

  const styleForm = { maxWidth: '800px', padding:'30px 50px' };
  const errorMsg = {color: 'red'}
    return (
      <div className="register-form container" style={styleForm}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name : </label>
            <input name="name" type="text" value={values.name} onChange={handleInputChange("name")} />
            <div style={errorMsg}>{simpleValidator.current.message('name', values.name, 'required')}</div>
          </div>
  
          <div className="form-group">
            <label>Email : </label>
            <input  name="email" type="email" value={values.email} onChange={handleInputChange("email")}/>
            <div style={errorMsg}>{simpleValidator.current.message('email', values.email, 'required|email|min:4|max:40')}</div>
          </div>

          <div className='form-group'>
            <label>Choose a car:</label>
            <select name="country" id="country" onChange={handleInputChange("country")} value={values.country}>
              <option value="">Select Country</option>
              {
                    lists.map((item) => {
                        return(
                            <option key={item.id} value={item.id}>{`${item.name} - ${item.code}`}</option>
                        )
                    })
              } 
            </select>
            <div style={errorMsg}>{simpleValidator.current.message('country', values.country, 'required')}</div>
          </div>
          
          <div className="form-group">
            <label>Mobile : </label>
            <input name="mobile" type="text" value={values.mobile} onChange={handleInputChange("mobile")}/>
            <div style={errorMsg}>{simpleValidator.current.message('mobile', values.mobile, 'required')}</div>
          </div>
  
          <div className="form-group">
            <label>Password : </label>
            <input name="password" type="password" value={values.password} onChange={handleInputChange("password")}/>
            <div style={errorMsg}>{simpleValidator.current.message('password', values.password, 'required')}</div>
          </div>
          
          <div className="form-group">
            <label>Confirm Password : </label>
            <input name="cpassword" type="password" value={values.cpassword} onChange={handleInputChange("cpassword")}/>
            <div style={errorMsg}>{simpleValidator.current.message('cocpassworduntry', values.cpassword, 'required')}</div>
          </div>
  
          <div className="form-group">
          <label>Security Check : </label>
            <input name="security" type="text" value={values.security} onChange={handleInputChange("security")}/>
            <div style={errorMsg}>{simpleValidator.current.message('security', values.security, 'required')}</div>
          </div>

          {/* <div className="form-group">
            <div className="form-group">
            <label for="terms">Terms and condition : </label>
              <input type="checkbox" name="terms"  value="1"  onChange={handleInputChange("terms")} />
              <div style={errorMsg}>{simpleValidator.current.message('terms', values.terms, 'required')}</div>
            </div>
          </div> */}
          <div className="form-group">
            <div className="form-group">
                <input className="input-field" type='checkbox' name='u_check' id='u_check' 
                    onChange={handleCheckClick}  
                    />
                    <label className="form-label" htmlFor='u_check'>I hereby acknowledge that I have read, understand, and agree to the CarTreks Terms of Use and Privacy Policy.</label>    
                    <div className="form-label"  style={errorMsg}>{simpleValidator.current.message('u_check', values.u_check, 'required',{messages: {required: 'Please agree to terms and conditions'}})}</div>
                    <span className="form-label" style={errorMsg} >{checkerr }</span>
                </div></div>
  
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;