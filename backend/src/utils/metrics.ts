// calculate total revenue
export function calculateTotalRevenue(data: Array<object>) {
    return data.reduce((sum: number, row: any) => sum = sum + row.revenue, 0)
}

// calculate churn rate
export function calculateChurnRate(data: Array<object>) {
    let totalChurn = 0;
    let totalSubs = 0;

    data.forEach((row: any) => {
        totalChurn = totalChurn + row.cancellations;
        totalSubs = totalSubs + row.activeSubscribers;
    });

    return Number((totalChurn / totalSubs) * 100).toFixed(2);
}

// calculate total subscriptions
export function calculateTotalSubscriptions(data: Array<object>) {
    return data.reduce((sum: number, row: any) => sum = sum + row.activeSubscribers, 0);
}
