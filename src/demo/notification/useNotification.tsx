import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type TNotification = {
  label: string
  message: string
  created_at: string
}

const queryKey = 'notifications'

export const useNotification = () => {
  return useQuery<TNotification[]>({
    queryKey: [queryKey],
    initialData: []
  })
}

export const useAddNotification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: TNotification) => {
      queryClient.setQueryData([queryKey], (old: TNotification[]) => [
        ...old,
        params
      ])
    }
  })
}
