import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './updateProfile.css'
import Loading from "../layout/loader/Loading"
import { MailOutline, Face } from "@mui/icons-material"
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, loadUser, updateProfile } from '../../actions/UserAction'
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstants'
import useTitle from '../layout/MetaData'

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { user } = useSelector(
        (state) => state.user
    );
    const { error, isUpdated, loading } = useSelector(
        (state) => state.profile
    );

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/user-icon.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile updated successfully.");
            dispatch(loadUser());

            dispatch({
                type: UPDATE_PROFILE_RESET
            })

            navigate("/account");
        }
    }, [dispatch, error, alert, navigate, user, isUpdated])

    useTitle("Update Profile");
    return (
        <>{loading ? <Loading /> :
            (<>
                <div className='updateProfileContainer'>
                    <div className='updateProfileBox'>
                        <h2 className='updateProfileHeading'>Update Profile</h2>
                        <form className='updateProfileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                            <div className='updateProfileName'>
                                <Face />
                                <input type="text" placeholder='Name' required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='updateProfileEmail'>
                                <MailOutline />
                                <input type="email" placeholder="Email"
                                    required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input type="file" name="avatar" accept="image/*"
                                    onChange={updateProfileDataChange} />
                            </div>
                            <input type="submit" value="Update" className='updateProfileBtn' />
                        </form>
                    </div>
                </div>
            </>
            )
        }
        </>
    )
};

export default UpdateProfile