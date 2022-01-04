import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { API_BASE_URL } from '../../config/Constant';
import axios from 'axios';

function Register() {
  const [values, setValues] = React.useState({
    name: '',
    email: "",
    CountryCode: "",
    mob: "",
    pass: "",
    cpass: "",
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
      const response = await fetch(API_BASE_URL +"/api/get_countries");
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
    const formData = new FormData(e.target);
        console.log('Data:',formData);
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    }else{
        const formData = new FormData(e.target.value);
        console.log('user value is:',formData);
        axios.post(API_BASE_URL + 'api/user_registration', {
          method: 'POST',
          body: formData,
        //   mode:'cors',
        //   'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        // 'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
        }).then(res => {
            console.log("Status: ", res.status);
            console.log("Data: ", res.data.data);
            if(res.data.status == 'success'){
                console.log('succcess')                    
            }else{
                console.log('Not succcess')   
            }
        })
    }
  }

  const styleForm = { maxWidth: '800px', padding:'30px 50px' };
  const errorMsg = {color: 'red'}
    return (
      <div className="register-form container" style={styleForm}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='name'>Name : </label>
            <input name="name" type="text" value={values.name} onChange={handleInputChange("name")} />
            <div style={errorMsg}>{simpleValidator.current.message('name', values.name, 'required')}</div>
          </div>
  
          <div className="form-group">
            <label htmlFor='email'>Email : </label>
            <input  name="email" type="email" value={values.email} onChange={handleInputChange("email")}/>
            <div style={errorMsg}>{simpleValidator.current.message('email', values.email, 'required|email|min:4|max:40')}</div>
          </div>

          <div className='form-group'>
            <label htmlFor='CountryCode'>Choose Country : </label>
            <select name="CountryCode" id="CountryCode" onChange={handleInputChange("CountryCode")} value={values.CountryCode}>
              <option value="">Select Country</option>
              {
                    lists.map((item) => {
                        return(
                            <option key={item.id} value={item.id}>{`${item.name} - ${item.code}`}</option>
                        )
                    })
              } 
            </select>
            <div style={errorMsg}>{simpleValidator.current.message('CountryCode', values.CountryCode, 'required')}</div>
          </div>
          
          <div className="form-group">
            <label>Mobile : </label>
            <input name="mob" type="text" value={values.mob} onChange={handleInputChange("mob")}/>
            <div style={errorMsg}>{simpleValidator.current.message('mob', values.mob, 'required')}</div>
          </div>
  
          <div className="form-group">
            <label>Password : </label>
            <input name="pass" type="password" value={values.pass} onChange={handleInputChange("pass")}/>
            <div style={errorMsg}>{simpleValidator.current.message('pass', values.pass, 'required')}</div>
          </div>
          
          <div className="form-group">
            <label>Confirm Password : </label>
            <input name="cpass" type="password" value={values.cpass} onChange={handleInputChange("cpass")}/>
            <div style={errorMsg}>{simpleValidator.current.message('cpass', values.cpass, `required|in:${values.pass}`,{messages: {in: 'Passwords does not match'}})}</div>
          </div>
  
          <div className="form-group">
          <label>Security Check : </label>
            <input name="security" type="text" value={values.security} onChange={handleInputChange("security")}/>
            <div style={errorMsg}>{simpleValidator.current.message('security', values.security, 'required')}</div>
          </div>
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
  
  export default Register;