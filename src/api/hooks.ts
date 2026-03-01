import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchUser,
  fetchProducts,
  fetchTasks,
  fetchInvites,
  fetchReferralLevels,
  fetchOwnedTrucks,
  completeTask as apiCompleteTask,
  buyProduct as apiBuyProduct,
} from './index'

export const queryKeys = {
  user: ['user'] as const,
  products: ['products'] as const,
  tasks: ['tasks'] as const,
  invites: ['invites'] as const,
  referralLevels: ['referralLevels'] as const,
  ownedTrucks: ['ownedTrucks'] as const,
}

export function useUser() {
  return useQuery({ queryKey: queryKeys.user, queryFn: fetchUser })
}

export function useProducts() {
  return useQuery({ queryKey: queryKeys.products, queryFn: fetchProducts })
}

export function useTasks() {
  return useQuery({ queryKey: queryKeys.tasks, queryFn: fetchTasks })
}

export function useInvites() {
  return useQuery({ queryKey: queryKeys.invites, queryFn: fetchInvites })
}

export function useReferralLevels() {
  return useQuery({ queryKey: queryKeys.referralLevels, queryFn: fetchReferralLevels })
}

export function useOwnedTrucks() {
  return useQuery({ queryKey: queryKeys.ownedTrucks, queryFn: fetchOwnedTrucks })
}

export function useCompleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiCompleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks })
    },
  })
}

export function useBuyProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiBuyProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products })
    },
  })
}
