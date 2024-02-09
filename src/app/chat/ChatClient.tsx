'use client'

import { TUserWithChat } from '@/types'
import { User, UserType } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

interface ChatClientProps {
  currentUser?: User | null
}

const ChatClient = ({ currentUser }: ChatClientProps ) => {

  // 채팅 목록에서 나타낼 상대방의 id, name, image 상태 값
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: ""
  })

  // 반응형을 위한 상태값
  const [layout, setLayout] = useState(false)

  // swr 이라는 react hook 라이브러리 데이터를 가져오는
  // login pooling 으로 일정 시간마다 데이터를 계속 요청해서 데이터를 받아오는 방법
  const fetcher = (url: string) => axios.get(url).then(res => res.data)

  const { data: users, isLoading, error } = useSWR('/api/chat', fetcher, {
    refreshInterval: 3000
  })

  // 현재 로그인된 유저email과 데이터베이스에서 가져온 user목록에 email이 같은것을 찾아 저장
  // 즉 자기 자신의 데이터를 찾아 저장
  const currentUserWithMessage = users.find((user: TUserWithChat)=> user.email === currentUser?.email)

  // console.log(currentUserWithMessage)

  // 서버에 데이터를 요청해서 json으로 가져오기
  // useEffect를 통해 특정상태나, 렌더링될때 한번 데이터를 가져오는 방법
  // useEffect(() => {
  //   axios.get("/api/chat")
  //   .then(res => console.log(res))
  // }, [])

  if(isLoading) return <p>Loading....</p>
  if(error) return <p>Error!!</p>
  

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
        {/* 목록 섹션 */}
        <section className={`md:flex ${layout && 'hidden'}`}>
          contact Component
        </section>

        {/* 채팅 섹션 */}
        <section className={`md:flex ${!layout && 'hidden'}`}>
          chat Component
        </section>
      </div>
    </main>
  )
}

export default ChatClient