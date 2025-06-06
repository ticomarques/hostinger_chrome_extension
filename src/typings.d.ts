
export interface Plan {
    id: number,
    firewall_group_id: number;
    subscription_id: string;
    plan: string;
    hostname: string;
    state: string;
    actions_lock: string;
    cpus: number;
    memory: number;
    disk: number;
    bandwidth: number;
    ns1: string;
    ns2: string;
    ipv4: [
        {
            id: number;
            address: string;
            ptr: string;
        }
    ],
    ipv6: [
        {
            id: number;
            address: string;
            ptr: string;
        }
    ],
    template: {
        id: number;
        name: string;
        description: string;
        documentation: null;
    },
    created_at: string;
}


export interface PlanUsage {
    cpu_usage: {
        unit: string;
        usage: {
            [key: string]: number;
        };
    };
    ram_usage: {
        unit: string;
        usage: {
            [key: string]: number;
        };
    };
    disk_space: {
        unit: string;
        usage: {
            [key: string]: number;
        };
    };
    outgoing_traffic: {
        unit: string;
        usage: {
            [key: string]: number;
        };
    };
    incoming_traffic: {
        unit: string;
        usage: {
            [key: string]: number;
        };
    };
}
export interface PlanUsageResponse {
    data: PlanUsage;
}

