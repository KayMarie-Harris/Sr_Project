import { useEffect, useState } from "react"

const ProfileInfo = (apiEndpoint) => {
    const [name, setName] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setName(response.name)
            }
            catch (error) {
                setIsLoggedIn(false);
            }

            if (name != null) {
                setIsLoggedIn(true)
            }
        };

        fetchProfileInfo();
    }, [apiEndpoint]);

    return { name, isLoggedIn };
};

export default ProfileInfo;