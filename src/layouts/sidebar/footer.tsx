import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { dx } from '@/shared/design-system/typography'
import { CaretSortIcon, LockClosedIcon, ExitIcon } from '@radix-ui/react-icons'

export default function SidebarFooter() {
  return (
    <div className="w-full shrink-0 overflow-hidden rounded-tr-2xl bg-background">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-xl p-2">
          <Avatar className="shrink-0">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex grow flex-col items-start text-start">
            <span className={dx('heading-compact-01', 'line-clamp-1')}>
              John Doe
            </span>
            <span
              className={dx('label-01', 'line-clamp-1 text-muted-foreground')}
            >
              john.doe@company.com
            </span>
          </div>
          <CaretSortIcon className="shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="right"
          sideOffset={8}
          alignOffset={8}
          className="min-w-[15rem] rounded-2xl"
        >
          <DropdownMenuGroup className="p-1">
            <div className="flex w-full items-center gap-2">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex grow flex-col items-start">
                <span className={dx('heading-compact-01', 'line-clamp-1')}>
                  John Doe
                </span>
                <span
                  className={dx(
                    'label-01',
                    'line-clamp-1 text-muted-foreground'
                  )}
                >
                  john.doe@company.com
                </span>
              </div>
            </div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="gap-2">
              <LockClosedIcon />
              Change Password
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="gap-2">
              <ExitIcon />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
