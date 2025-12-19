
export interface ForumUserApi {
  id?: string
  email: string
  username: string
  display_name: string
  avatar_url?: string
  is_online: string
  last_seen?: boolean
  created_at?: Date
  updated_at?: Date
}

export interface ForumUserUi {
  id?: string
  email: string
  username: string
  display_name: string
  avatar_url?: string
  is_online: string
  last_seen?: boolean
  created_at?: Date
  updated_at?: Date
}

export interface ForumMessageApi {
  id?: string
  channel_id: string
  user_id: string
  content: string
  message_type: string
  parent_message_id?: string
  is_edited: boolean
  is_deleted: boolean
  created_at?: Date
  updated_at?: Date
}

export interface ForumMessageUi {
  id?: string
  channel_id: string
  user_id: string
  content: string
  message_type: string
  parent_message_id?: string
  is_edited: boolean
  is_deleted: boolean
  created_at?: Date
  updated_at?: Date
}

export interface ForumChannelApi {
  id?: string
  name: string
  description?: string
  is_private: boolean
  is_direct_message: boolean
  created_by: string
  created_at: Date
}

export interface ForumChannelUi {
  id?: string
  name: string
  description?: string
  is_private: boolean
  is_direct_message: boolean
  created_by: string
  created_at: Date
}

export interface ForumChannelMemberApi {
  channel_id: string
  user_id: string
  role: string
  joined_at: Date
}

export interface ForumChannelMemberUi {
  channel_id: string
  user_id: string
  role: string
  joined_at: Date
}
