import React from 'react';
import { Button, DropdownMenu } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '../icons';

function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray">
          {session.user.name}
          <ChevronDownIcon className='w-4 h-4' />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content content='popper' variant='soft' color='gray'>
        <DropdownMenu.Item >Profile</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => { signOut({ callbackUrl: "/" }); }} color="red">
          Sign Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default UserMenu;