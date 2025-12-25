import { Injectable } from '@angular/core';
import {
  ForumChannelApi,
  ForumChannelMemberApi,
  ForumChannelMemberUi,
  ForumChannelMessagesApi,
  ForumChannelMessagesUi,
  ForumChannelUi,
  ForumMessageApi,
  ForumMessageUi,
  ForumUserApi,
  ForumUserUi,
} from '../models/forum.models';

@Injectable({
  providedIn: 'root',
})
export class ForumAdapterService {
  // Adapters for ForumUser
  toForumUserUi(user: ForumUserApi): ForumUserUi {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      display_name: user.display_name,
      avatar_url: user.avatar_url,
      is_online: user.is_online,
      last_seen: user.last_seen,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  toForumUserApi(user: ForumUserUi): ForumUserApi {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      display_name: user.display_name,
      avatar_url: user.avatar_url,
      is_online: user.is_online,
      last_seen: user.last_seen,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  toForumUserUiList(data: ForumUserApi[]): ForumUserUi[] {
    return data.map((d) => this.toForumUserUi(d));
  }

  toForumUserApiList(data: ForumUserUi[]): ForumUserApi[] {
    return data.map((d) => this.toForumUserApi(d));
  }

  // Adapter for ForumChannel
  toForumChannelApi(data: ForumChannelUi): ForumChannelApi {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      is_private: data.is_private,
      is_direct_message: data.is_direct_message,
      created_by: data.created_by,
      created_at: data.created_at,
    };
  }

  toForumChannelUi(data: ForumChannelApi): ForumChannelUi {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      is_private: data.is_private,
      is_direct_message: data.is_direct_message,
      created_by: data.created_by,
      created_at: data.created_at,
    };
  }

  toForumChannelUiList(data: ForumChannelApi[]): ForumChannelUi[] {
    return data.map((d) => this.toForumChannelUi(d));
  }

  toForumChannelApiList(data: ForumChannelUi[]): ForumChannelApi[] {
    return data.map((d) => this.toForumChannelApi(d));
  }

  // Adapter for ForumMessage
  toForumMessageUi(data: ForumMessageApi): ForumMessageUi {
    return {
      id: data.id,
      channel_id: data.channel_id,
      user_id: data.user_id,
      content: data.content,
      message_type: data.message_type,
      parent_message_id: data.parent_message_id,
      is_edited: data.is_edited,
      is_deleted: data.is_deleted,
      created_at: data.created_at,
      updated_at: data.updated_at,
      parent_message: data.parent_message !== undefined ? this.toForumMessageUi(data.parent_message) : undefined,
      user: data.user !== undefined ? this.toForumUserUi(data.user) : undefined,
    };
  }

  toForumMessageApi(data: ForumMessageUi): ForumMessageApi {
    return {
      id: data.id,
      channel_id: data.channel_id,
      user_id: data.user_id,
      content: data.content,
      message_type: data.message_type,
      parent_message_id: data.parent_message_id,
      is_edited: data.is_edited,
      is_deleted: data.is_deleted,
      created_at: data.created_at,
      updated_at: data.updated_at,
      parent_message: data.parent_message !== undefined ? this.toForumMessageApi(data.parent_message) : undefined,
      user: data.user !== undefined ? this.toForumUserApi(data.user) : undefined,
    };
  }

  toForumMessageUiList(data: ForumMessageApi[]): ForumMessageUi[] {
    return data.map((d) => this.toForumMessageUi(d));
  }

  toForumMessageApiList(data: ForumMessageUi[]): ForumMessageApi[] {
    return data.map((d) => this.toForumMessageApi(d));
  }

  // Adapter for ForumChannelMember
  toForumChannelMemberUi(data: ForumChannelMemberApi): ForumChannelMemberUi {
    return {
      channel_id: data.channel_id,
      user_id: data.user_id,
      role: data.role,
      joined_at: data.joined_at,
    };
  }

  toForumChannelMemberApi(data: ForumChannelMemberUi): ForumChannelMemberApi {
    return {
      channel_id: data.channel_id,
      user_id: data.user_id,
      role: data.role,
      joined_at: data.joined_at,
    };
  }

  toForumChannelMemberUiList(data: ForumChannelMemberApi[]): ForumChannelMemberUi[] {
    return data.map((d) => this.toForumChannelMemberUi(d));
  }

  toForumChannelMemberApiList(data: ForumChannelMemberUi[]): ForumChannelMemberApi[] {
    return data.map((d) => this.toForumChannelMemberApi(d));
  }

  // Adapter for ForumChannelMessages
  toForumChannelMessagesUi(data: ForumChannelMessagesApi): ForumChannelMessagesUi {
    return {
      channel: this.toForumChannelUi(data.channel),
      messages: this.toForumMessageUiList(data.messages),
      page: data.page,
      limit: data.limit,
      total: data.total,
    }
  }

  toForumChannelMessagesApi(data: ForumChannelMessagesUi): ForumChannelMessagesApi {
    return {
      channel: this.toForumChannelApi(data.channel),
      messages: this.toForumMessageApiList(data.messages),
      page: data.page,
      limit: data.limit,
      total: data.total,
    }
  }
}
