import React from 'react';
import Loader from "@/components/shared/Loader.tsx";
import UserCard from "@/components/shared/UserCard.tsx";
import {useGetUsers} from "@/lib/react-query/queriesAndutations.ts";
import {useToast} from "@/hooks/use-toast.ts";

const AllUsers = () => {
    const {toast} = useToast();
    const {data: users, isPending: isUserLoading, isError: isErrorUsers} = useGetUsers();

    if (isErrorUsers) {
        return toast({title: "Something went wrong"});
    }

    return (
        <div>
            <div className="common-container">
                <div className="user-container">
                    <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
                    {isUserLoading && !users ? (
                        <Loader/>
                    ) : (
                        <ul className="user-grid">
                            {users?.documents.map((user) => (
                                <li key={user?.$id} className="flex-1 min-w-[200px] w-full">
                                    <UserCard user={user}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;