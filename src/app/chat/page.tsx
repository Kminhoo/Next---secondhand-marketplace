import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ChatClient from './ChatClient'

const ChatPage = async () => {
  // 로그인한 유저 데이터 가져오기
  const currentUser = await getCurrentUser()

  return (
    <ChatClient 
      currentUser={currentUser}
    />
  )
}

export default ChatPage