import React from "react";
import { useSelector } from "react-redux";
import SideChat from "../SideChat/SideChat";
import { Loader, Text } from "@mantine/core";
import useFetch from "../../hooks/useFetch";

const SideChats = ({ setSelectedChat }) => {
  /**
   * Redux store states
   */
  const { _id } = useSelector((store) => store.user.user);

  // Fetching all chats of current user
  const { data, isLoading, error } = useFetch(`/api/chats/${_id}`);
  return (
    <>
      <Text style={{ marginBottom: "15px" }}>Conversations</Text>
      {isLoading ? (
        <Loader size="md" style={{ display: "block", marginInline: "auto" }} />
      ) : (
        <div>
          {data?.map((item) => (
            <div onClick={() => setSelectedChat(item)} key={item._id}>
              <SideChat conversation={item} currentUserID={_id} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SideChats;
