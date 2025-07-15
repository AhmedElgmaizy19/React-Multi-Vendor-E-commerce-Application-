import userAuthStore from "../store/authSlice";
import axiosInstance from "../config/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export const login = async (email, password) => {
    try {
        const { data, status } = await axiosInstance.post('user/token/', {
            email,
            password
        });



        if (status === 200) {
            setAuthUser(data.access, data.refresh);
        }



        return { data, error: null };
    } catch (e) {
        return { data: null, error: e.response?.data?.detail || 'something went wrong' };
    }
};


export const register = async (full_name, email, phone, password1, password2) => {
    try {
        const { data } = await axiosInstance.post('user/register/', {
            full_name,
            email,
            phone,
            password1,
            password2
        });

        await login(email, password1);
        return { data, error: null };
    } catch (e) {
        return { data: null, error: e.response?.data?.detail || 'something went wrong' };
    }
};


export const logout = async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    userAuthStore.getState().setUser(null);
};


export const setUser = async () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken();
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};


export const setAuthUser = (accessToken, refreshToken) => {
    const user = jwtDecode(accessToken) ?? null;

    if (user) {
        userAuthStore.getState(). setUser(user);
    }

    Cookies.set('access_token', accessToken, { expires: 1, secure: true });
    Cookies.set('refresh_token', refreshToken, { expires: 7, secure: true });

    userAuthStore.getState().setLoading(false);
};



export const getRefreshToken = async () => {
    // 1. جلب التوكن من الكوكيز مباشرة
    const refreshToken = Cookies.get('refresh_token');
    
    // 2. فحص وجود التوكن
    if (!refreshToken) {
        throw new Error('REFRESH_TOKEN_NOT_FOUND');
    }

    try {
        // 3. إرسال الطلب
        const response = await axiosInstance.post('user/token/refresh/', {
            refresh: refreshToken
        }
            
        );

        // 4. فحص الاستجابة
        if (!response.data || !response.data.access) {
            throw new Error('Invalid refresh response');
        }

        return {
            access: response.data.access,
            refresh: response.data.refresh || refreshToken,
            success: true
        };

    } catch (error) {
        console.error('Refresh token failed:', error);

        // 5. معالجة الأخطاء
        if (error.response?.status === 401) {
            // التوكن منتهي الصلاحية - امسح الكوكيز
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            userAuthStore.getState().setUser(null);
            throw new Error('REFRESH_TOKEN_EXPIRED');
        }

        if (error.response?.status >= 500) {
            throw new Error('SERVER_ERROR');
        }

        if (error.code === 'ECONNABORTED') {
            throw new Error('NETWORK_TIMEOUT');
        }

        throw new Error(error.response?.data?.detail || 'Refresh failed');
    }
};


export const isAccessTokenExpired = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};



// // Function to refresh the access token using the refresh token
// export const getRefreshToken = async () => {
//     // Retrieving refresh token from cookies and making a POST request to refresh the access token
//     const refresh_token = Cookies.get('refresh_token');
//     const response = await axios.post('user/token/refresh/', {
//         refresh: refresh_token,
//     });

//     // Returning the refreshed access token
//     return response.data;
// };
