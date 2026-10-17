export const demoItems = [
    {
        id: "CF-1001",
        title: "Black wireless earbuds",
        type: "found",
        category: "Electronics",
        location: "Library, 2nd floor",
        date: "2026-10-16",
        status: "pending",
        reportedBy: "Student 104",
    },
    {
        id: "CF-1002",
        title: "Blue college ID card",
        type: "lost",
        category: "ID Cards",
        location: "Main block",
        date: "2026-10-15",
        status: "open",
        reportedBy: "Student 218",
    },
    {
        id: "CF-1003",
        title: "Grey laptop sleeve",
        type: "found",
        category: "Bags",
        location: "Cafeteria",
        date: "2026-10-14",
        status: "pending",
        reportedBy: "Student 067",
    },
    {
        id: "CF-1004",
        title: "Engineering mathematics notebook",
        type: "lost",
        category: "Books & Notes",
        location: "Block C, Room 204",
        date: "2026-10-13",
        status: "open",
        reportedBy: "Student 312",
    },
    {
        id: "CF-1005",
        title: "Silver water bottle",
        type: "found",
        category: "Water Bottles",
        location: "Sports ground",
        date: "2026-10-12",
        status: "resolved",
        reportedBy: "Student 155",
    },
];

export const demoMatches = [
    {
        id: "MT-201",
        lostTitle: "Black Bluetooth earbuds",
        foundTitle: "Black wireless earbuds",
        lostLocation: "Library",
        foundLocation: "Library, 2nd floor",
        score: 92,
        status: "pending",
    },
    {
        id: "MT-202",
        lostTitle: "Blue student ID",
        foundTitle: "Blue college ID card",
        lostLocation: "Main block",
        foundLocation: "Main block",
        score: 86,
        status: "pending",
    },
    {
        id: "MT-203",
        lostTitle: "Grey laptop bag",
        foundTitle: "Grey laptop sleeve",
        lostLocation: "Cafeteria",
        foundLocation: "Cafeteria",
        score: 68,
        status: "pending",
    },
];

export const demoClaims = [
    {
        id: "CL-301",
        item: "Black wireless earbuds",
        claimant: "Student 104",
        submitted: "2026-10-16",
        status: "pending",
    },
    {
        id: "CL-302",
        item: "Blue college ID card",
        claimant: "Student 218",
        submitted: "2026-10-15",
        status: "pending",
    },
    {
        id: "CL-303",
        item: "Silver water bottle",
        claimant: "Student 155",
        submitted: "2026-10-12",
        status: "approved",
    },
];

export const demoUsers = [
    { id: "ST-104", name: "Student 104", email: "student104@example.edu", reports: 4, status: "active" },
    { id: "ST-218", name: "Student 218", email: "student218@example.edu", reports: 2, status: "active" },
    { id: "ST-067", name: "Student 067", email: "student067@example.edu", reports: 3, status: "active" },
    { id: "ST-312", name: "Student 312", email: "student312@example.edu", reports: 1, status: "suspended" },
];

export const demoReturns = [
    { id: "RT-401", item: "Silver water bottle", owner: "Student 155", verifiedBy: "Administrator", date: "2026-10-12" },
];