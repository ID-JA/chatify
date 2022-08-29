import { Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import React from 'react';
import { useSelector } from 'react-redux';

import axiosInstance from '../../axios';
import SideChat from '../SideChat/SideChat';

const SideChats = ({ setSelectedChat }) => {
  /**
   * Redux store states
   */
  const { _id } = useSelector((store) => store.user.user);

  // Fetching all chats of current user
  const getChatsByUser = async (userID) => {
    const { data } = await axiosInstance.get(`/api/chats/${userID}`);
    return data;
  };
  const { data, isLoading } = useQuery(['chatsByUserId', _id], () => getChatsByUser(_id));
  return (
    <>
      <Text style={{ marginBottom: '15px' }}>Conversations</Text>
      {isLoading ? (
        <Loader size="md" style={{ display: 'block', marginInline: 'auto' }} />
      ) : (
        <div>
          {data?.map((item) => (
            <div aria-hidden="true" onClick={() => setSelectedChat(item)} key={item._id}>
              <SideChat conversation={item} currentUserID={_id} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SideChats;
