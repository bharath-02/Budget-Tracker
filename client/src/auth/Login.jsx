import React, { useState } from 'react';
import{ Card, CardActions, CardContent, Button, TextField, Typography, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import auth from './auth-helper';
import { Redirect } from 'react-router-dom';
import { Login } from './auth-user';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))


const Login = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const handleSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        Login(user).then((data) => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true })
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const {from} = props.location.state || {
        from: {
            pathname: '/'
        }
    }

    const {redirectToReferrer} = values;
    if(redirectToReferrer) {
        return (
            <Redirect to={from} />
        )
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} variant="h6">Log In</Typography>
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
                <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                <br />
                {
                    values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>
                    )
                }          
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
    )
}

export default Login;