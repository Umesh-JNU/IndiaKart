import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './updatePassword.css'
import Loading from "../layout/loader/Loading"
import { clearErrors, updatePassword } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { VpnKey, LockOpen, Lock } from '@mui/icons-material'
import MetaData from '../layout/MetaData'

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(
        (state) => state.profile
    );

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Changed Password successfully.");

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })

            navigate("/account");
        }
    }, [dispatch, error, alert, navigate, isUpdated])

    return (
        <>{loading ? <Loading /> :
            (<>
                <MetaData title="Change Password" />
                <div className='updatePasswordContainer'>
                    <div className='updatePasswordBox'>
                        <h2 className='updatePasswordHeading'>Update Password</h2>
                        <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                            <div className='loginPassword'>
                                <VpnKey />
                                <input type="password" placeholder="Old Password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className='loginPassword'>
                                <LockOpen />
                                <input type="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className='loginPassword'>
                                <Lock />
                                <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Change" className='updatePasswordBtn' />
                        </form>
                    </div>
                </div>
            </>
            )
        }
        </>
    )
}

export default UpdatePassword