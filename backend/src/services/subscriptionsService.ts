import { getSubscriptionsPaginated } from "../repositories/subscriptionRepository";

//service to get paginated subscriptions
export async function getPaginatedSubscriptions(
  page: number,
  pageSize: number
) {
  const offset = (page - 1) * pageSize;
  return await getSubscriptionsPaginated(pageSize, offset);
}
