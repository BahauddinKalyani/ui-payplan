"use client";

import React, { useState, useEffect } from 'react';
import { withAuth } from "@/components/withAuth";
import CustomNavigation from "@/app/dashboard/navigation";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProfileEditForm } from '@/app/profile/ProfileEditForm';
import { PasswordChangeForm } from '@/app/profile/PasswordChangeForm';
import { User, AtSign, Calendar, Mail } from "lucide-react";
import { useIsMobile } from '@/hooks/is-mobile';

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: localStorage.getItem('firstName') || 'John',
    lastName: localStorage.getItem('lastName') || 'Doe',
    // email: localStorage.getItem('email') || '',
    age: parseInt(localStorage.getItem('age') || '0'),
    avatar: localStorage.getItem('avatar') || '',
  });

  const [avatars, setAvatars] = useState<string[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const avatarFiles = ["3d_4.png",
        "3d_1.png",
        "3d_2.png",
        "3d_3.png",
        "3d_5.png",
        "bluey_1.png",
        "bluey_2.png",
        "bluey_3.png",
        "bluey_4.png",
        "bluey_5.png",
        "bluey_6.png",
        "bluey_7.png",
        "bluey_8.png",
        "bluey_9.png",
        "bluey_10.png",
        "notion_1.png",
        "notion_2.png",
        "notion_3.png",
        "notion_4.png",
        "notion_5.png",
        "notion_6.png",
        "notion_7.png",
        "notion_8.png",
        "notion_9.png",
        "notion_10.png",
        "notion_11.png",
        "notion_12.png",
        "notion_13.png",
        "notion_14.png",
        "notion_15.png",
        "teams_1.png",
        "teams_2.png",
        "teams_3.png",
        "teams_4.png",
        "teams_5.png",
        "teams_6.png",
        "teams_7.png",
        "teams_8.png",
        "teams_9.png",
        "toon_1.png",
        "toon_2.png",
        "toon_3.png",
        "toon_4.png",
        "toon_5.png",
        "toon_6.png",
        "toon_7.png",
        "toon_8.png",
        "toon_9.png",
        "toon_10.png",
        "upstream_1.png",
        "upstream_2.png",
        "upstream_3.png",
        "upstream_4.png",
        "upstream_5.png",
        "upstream_6.png",
        "upstream_7.png",
        "upstream_8.png",
        "upstream_9.png",
        "upstream_10.png",
        "upstream_11.png",
        "upstream_12.png",
        "upstream_13.png",
        "upstream_14.png",
        "upstream_15.png",
        "upstream_16.png",
        "upstream_17.png",
        "upstream_18.png",
        "upstream_19.png",
        "upstream_20.png",
        "upstream_21.png",
        "upstream_22.png",
        "vibrent_1.png",
        "vibrent_2.png",
        "vibrent_3.png",
        "vibrent_4.png",
        "vibrent_5.png",
        "vibrent_6.png",
        "vibrent_7.png",
        "vibrent_8.png",
        "vibrent_9.png",
        "vibrent_10.png",
        "vibrent_11.png",
        "vibrent_12.png",
        "vibrent_13.png",
        "vibrent_14.png",
        "vibrent_15.png",
        "vibrent_16.png",
        "vibrent_17.png",
        "vibrent_18.png",
        "vibrent_19.png",
        "vibrent_20.png",
        "vibrent_21.png",
        "vibrent_22.png",
        "vibrent_23.png",
        "vibrent_24.png",
        "vibrent_25.png",
        "vibrent_26.png",
        "vibrent_27.png"]
    setAvatars(avatarFiles);
  }, []);

  const renderTabs = () => (
    <Tabs defaultValue="profile" className={isMobile ? "w-full" : "w-4/5"}>
      <TabsList>
        <TabsTrigger value="profile">Edit Profile</TabsTrigger>
        <TabsTrigger value="password">Change Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileEditForm avatars={avatars} setUserInfo={setUserInfo} userInfo={userInfo}/>
      </TabsContent>
      <TabsContent value="password">
        <PasswordChangeForm />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="flex flex-col h-screen">
      <CustomNavigation isMobile={isMobile} />
      {isMobile ? (
        <div className="flex-1 p-4">
          {renderTabs()}
        </div>
      ) : (
        <div className="flex flex-1">
          <div className="w-1/5 p-6 flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4 border-2 border-white mx-auto mt-8">
              <AvatarImage src={userInfo.avatar? '/avatars/'+userInfo.avatar:undefined} alt="User avatar" className="rounded-full" />
              <AvatarFallback>{localStorage.getItem('username')?.charAt(0).toUpperCase() || 'NA'}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
              <h2 className="text-xl font-semibold text-white text-center">{userInfo.firstName} {userInfo.lastName}</h2>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <User size={16} /> <AtSign className="ml-2" size={16}/>
                <span className="flex-grow ml-0">{localStorage.getItem('username')}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <Calendar size={16} />
                <span className="flex-grow ml-2">Age: {userInfo.age}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <Mail size={16} />
                <span className="flex-grow ml-2">{localStorage.getItem('email') || ''}</span>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="w-4/5 p-4">
            {renderTabs()}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(ProfilePage, DashboardSkeleton, '/login');