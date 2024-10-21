import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { dx } from '@/shared/design-system/typography'
import { useSidebar } from '@/shared/stores/sidebar'
import { CaretSortIcon, LockClosedIcon, ExitIcon } from '@radix-ui/react-icons'

export default function UserMenu() {
  const { isOpen } = useSidebar()
  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 w-full overflow-hidden rounded-tr-2xl bg-background p-2 transition-all',
        !isOpen && 'p-0'
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-xl p-1">
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
          sideOffset={16}
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
