
import { useEffect, useState } from 'react';

const UseIterator = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [existingUsers, setExistingUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
        console.log(existingUsers);
    }, [currentIndex]);

    const fetchUsers = () => {
        fetch('https://randomuser.me/api/')
            .then(res => res.json())
            .then(data => {
                const { results: userList } = data;
                const {
                    name: { first, last },
                    picture: { thumbnail }
                } = userList[0];

                // Update the existingUsers state variable
                setExistingUsers(prevExistingUsers => [...prevExistingUsers, { name: `${first} ${last}`, picture: thumbnail }]);

                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }

    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, existingUsers.length - 1));
    }

    return (
        <div>
            {isLoading ? 'Loading...' : (
                <>
                    <button onClick={handlePrevious} >Previous</button>
                    <button onClick={handleNext} >Next</button>

                    <div>
                        <img src={existingUsers[currentIndex].picture} alt={existingUsers[currentIndex].name} />
                        <div>{existingUsers[currentIndex].name}</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UseIterator;
