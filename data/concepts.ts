import type { Concept } from "@/lib/types";

export const concepts: Concept[] = [
  // ═══════════════════════════════════════
  // SCALING
  // ═══════════════════════════════════════
  {
    id: "load-balancing",
    name: "Load Balancing",
    categoryId: "scaling",
    difficulty: "beginner",
    definition:
      "Load balancing distributes incoming network traffic across multiple servers to ensure no single server bears too much demand. It improves responsiveness, availability, and fault tolerance of applications.",
    importance:
      "Without load balancing, a single server becomes a bottleneck and a single point of failure. Load balancers are foundational to any scalable architecture, enabling horizontal scaling and high availability.",
    story:
      "Imagine you own a restaurant that's suddenly gone viral. One waiter can only serve so many tables before orders get delayed and customers leave angry. So what do you do? You hire more waiters. But who decides which waiter handles which table? That's your host — the load balancer. The host stands at the entrance, sees which waiters are busy, and sends new customers to the least busy one. If a waiter calls in sick (server goes down), the host simply stops sending people to that section. The restaurant keeps running smoothly, customers get served fast, and no single waiter is overwhelmed. That's exactly what a load balancer does for your servers.",
    howItWorks: [
      { title: "Client sends request", description: "A user makes a request to your application's public IP address or domain name." },
      { title: "Load balancer receives it", description: "The request hits the load balancer first, not any specific server. This is the single entry point." },
      { title: "Health check evaluation", description: "The LB checks which backend servers are healthy and available to handle requests." },
      { title: "Algorithm selects server", description: "Using an algorithm (round-robin, least connections, IP hash, or weighted), it picks the best server." },
      { title: "Request forwarded", description: "The request is forwarded to the selected server. The user never knows which server handled it." },
      { title: "Response returned", description: "The server processes the request and sends the response back through the load balancer to the client." },
    ],
    deepDive: [
      { title: "Algorithms Explained", content: "Round Robin sends requests to servers in sequence (1→2→3→1→2→3). Least Connections sends to the server with fewest active connections — great for long-lived requests. IP Hash guarantees the same client always hits the same server — useful for session stickiness. Weighted variants let you send more traffic to beefier servers." },
      { title: "L4 vs L7 Load Balancing", content: "Layer 4 (Transport) LBs route based on IP and TCP port — they're fast but can't inspect content. Layer 7 (Application) LBs can read HTTP headers, URLs, and cookies — enabling content-based routing like sending /api/* to API servers and /images/* to media servers. L7 is more flexible but adds slightly more latency." },
      { title: "The Sticky Session Problem", content: "If your app stores session data in server memory, you need 'sticky sessions' where the same user always hits the same server. But this defeats the purpose of load balancing — if that server dies, the user loses their session. The solution: externalize sessions to Redis or a database, making your servers truly stateless." },
    ],
    whenToUse: [
      "When a single server cannot handle all incoming requests",
      "When you need high availability and zero downtime",
      "When deploying multiple instances of a service",
      "When traffic patterns are unpredictable or bursty",
    ],
    useCases: [
      "Distributing web traffic across multiple app servers",
      "Balancing database read replicas",
      "API gateway request routing",
      "Microservice-to-microservice communication",
    ],
    tradeoffs: {
      pros: [
        "Eliminates single point of failure",
        "Improves response time via optimal routing",
        "Enables horizontal scaling",
        "Supports health checks and auto-failover",
      ],
      cons: [
        "Adds architectural complexity",
        "Can become a bottleneck itself if not scaled",
        "Session stickiness can reduce effectiveness",
        "Added latency from extra network hop",
      ],
    },
    realWorldExamples: [
      { company: "Netflix", description: "Uses Zuul and Eureka for dynamic load balancing across thousands of microservice instances, routing millions of requests per second." },
      { company: "AWS", description: "Elastic Load Balancing (ALB, NLB) automatically distributes traffic across EC2 instances, containers, and Lambda functions." },
    ],
    relatedConcepts: ["horizontal-scaling", "reverse-proxy", "health-checks", "auto-scaling"],
    keyTakeaway: "Load balancing is the gateway to horizontal scaling. Start with round-robin and evolve to more sophisticated algorithms as your system grows.",
  },
  {
    id: "horizontal-scaling",
    name: "Horizontal Scaling",
    categoryId: "scaling",
    difficulty: "beginner",
    definition:
      "Horizontal scaling (scaling out) adds more machines to a pool of resources, as opposed to vertical scaling (scaling up) which adds more power to an existing machine.",
    importance:
      "Horizontal scaling is the foundation of cloud-native architectures. It provides virtually unlimited growth potential and better fault tolerance compared to vertical scaling, which has physical hardware limits.",
    story:
      "Think of it this way: you're moving apartments and need to carry boxes upstairs. Vertical scaling is like hitting the gym to get stronger — eventually, no matter how buff you get, there's a limit to how many boxes one person can carry. Horizontal scaling is like calling your friends to help. Each friend carries a few boxes, and if you need to move faster, you just call more friends. If one friend gets tired and leaves, the rest keep going. This is why companies like Google don't buy one supercomputer — they buy thousands of regular computers and spread the work across all of them. The challenge? Coordinating all those friends (servers) so nobody duplicates work or steps on each other's toes.",
    howItWorks: [
      { title: "Identify the bottleneck", description: "Monitor your system to find what's overloaded — CPU, memory, I/O, or network." },
      { title: "Make services stateless", description: "Move any server-stored state (sessions, caches) to external stores (Redis, S3) so any server can handle any request." },
      { title: "Add more instances", description: "Spin up new server instances — identical copies of your application running on new machines or containers." },
      { title: "Register with load balancer", description: "New instances register with the load balancer so they start receiving traffic." },
      { title: "Distribute the load", description: "The load balancer spreads requests across all instances. More instances = more capacity." },
      { title: "Scale back when quiet", description: "During low-traffic periods, remove instances to save costs. Auto-scaling automates this." },
    ],
    deepDive: [
      { title: "Stateless vs Stateful", content: "The golden rule of horizontal scaling: your servers must be stateless. If a server stores user sessions in memory, you can't freely route requests to any server. Move sessions to Redis, auth tokens to JWTs, and file uploads to S3. Stateless servers are interchangeable — like identical workers on an assembly line." },
      { title: "Scaling the Database", content: "Scaling application servers is easy. Scaling databases is the hard part. Read replicas handle read-heavy workloads. Sharding splits data across multiple databases. Caching (Redis) reduces database hits by 90%. The database is almost always the bottleneck that's hardest to scale horizontally." },
      { title: "Cost Economics", content: "Two $50/month servers outperform one $200/month server in most cases. Commodity hardware is cheaper per unit of compute than premium hardware. Cloud providers charge linearly for horizontal scaling but exponentially for vertical scaling. This is why horizontal scaling wins economically at scale." },
    ],
    whenToUse: [
      "When vertical scaling reaches hardware limits",
      "When you need fault tolerance across machines",
      "When traffic is distributed and stateless",
      "When using cloud infrastructure with elastic capacity",
    ],
    useCases: [
      "Adding more web servers behind a load balancer",
      "Scaling out database read replicas",
      "Adding nodes to a distributed cache cluster",
      "Expanding Kubernetes pod replicas",
    ],
    tradeoffs: {
      pros: [
        "Near-unlimited scaling potential",
        "Better fault tolerance — one node failure doesn't take down the system",
        "Cost-effective with commodity hardware",
        "Enables geographic distribution",
      ],
      cons: [
        "Requires stateless application design",
        "Data consistency becomes challenging",
        "More complex deployment and monitoring",
        "Network overhead between nodes",
      ],
    },
    realWorldExamples: [
      { company: "Google", description: "Google Search runs on thousands of commodity servers, scaling horizontally to handle billions of queries per day." },
      { company: "Spotify", description: "Uses Kubernetes to horizontally scale microservices based on demand, with auto-scaling during peak music streaming hours." },
    ],
    relatedConcepts: ["load-balancing", "auto-scaling", "database-sharding"],
    keyTakeaway: "Design for horizontal scaling from day one by keeping services stateless. It's easier to add machines than to buy bigger ones.",
  },
  {
    id: "auto-scaling",
    name: "Auto Scaling",
    categoryId: "scaling",
    difficulty: "intermediate",
    definition:
      "Auto scaling automatically adjusts the number of compute resources based on real-time demand. It scales out when load increases and scales in when load decreases, optimizing both performance and cost.",
    importance:
      "Auto scaling ensures you're not over-provisioning (wasting money) or under-provisioning (poor performance). It's essential for handling unpredictable traffic patterns and maintaining SLAs cost-effectively.",
    story:
      "Picture a smart parking garage. Instead of building 10,000 spots for Black Friday traffic (which sit empty 364 days a year), imagine the garage could magically grow floors when it's busy and shrink when it's not. You'd only pay rent for the floors you're actually using. That's auto scaling. Your cloud infrastructure watches traffic metrics like a hawk. 'CPU at 80%? Spin up 3 more servers in 60 seconds. Traffic dropped? Let's spin those servers back down and stop paying for them.' Without auto-scaling, you either waste money running servers that sit idle or risk crashes when traffic spikes. It's the difference between a $10,000/month cloud bill and a $3,000/month bill — with better performance.",
    howItWorks: [
      { title: "Define scaling policies", description: "Set rules: 'If average CPU > 70% for 5 minutes, add 2 instances. If CPU < 30% for 10 minutes, remove 1 instance.'" },
      { title: "Monitoring collects metrics", description: "CloudWatch, Prometheus, or similar tools continuously monitor CPU, memory, request count, queue depth." },
      { title: "Threshold breached", description: "A metric crosses your defined threshold — e.g., CPU hits 75% sustained for 5 minutes." },
      { title: "Scaling action triggered", description: "The auto-scaler launches new instances from a pre-configured machine image (AMI, container image)." },
      { title: "New instances warm up", description: "Instances boot, run health checks, and register with the load balancer. This takes 30-120 seconds." },
      { title: "Traffic redistributed", description: "The load balancer starts routing traffic to new instances, reducing load on existing ones." },
    ],
    deepDive: [
      { title: "Scaling Metrics That Matter", content: "CPU utilization is the most common but not always the best metric. Request latency (P99 response time) catches problems before CPU spikes. Queue depth works great for worker processes. Custom metrics — like 'orders per second' — let you scale based on business metrics, not just infrastructure metrics." },
      { title: "Predictive vs Reactive Scaling", content: "Reactive scaling responds to current load — it's always slightly behind. Predictive scaling uses machine learning to analyze traffic patterns (e.g., lunch rush every weekday at noon) and pre-scales before the spike hits. AWS supports both. Use predictive scaling for known patterns and reactive as a safety net." },
      { title: "The Cold Start Problem", content: "When a new instance launches, it takes time to boot, load code, warm caches, and establish connections. During this 'cold start' window (30s-5min), the instance can't handle full load. Solutions: keep a minimum number of warm instances, use container images (faster boot than VMs), or pre-warm caches during health check period." },
    ],
    whenToUse: [
      "When traffic patterns are variable or unpredictable",
      "When you want to optimize cloud spending",
      "When SLAs require consistent response times",
      "During promotional events or seasonal spikes",
    ],
    useCases: [
      "E-commerce during flash sales or Black Friday",
      "Video streaming during popular show releases",
      "SaaS platforms with varying business-hour usage",
      "Batch processing workloads",
    ],
    tradeoffs: {
      pros: [
        "Cost optimization — pay only for what you use",
        "Handles traffic spikes automatically",
        "Reduces manual operational overhead",
        "Maintains performance during demand surges",
      ],
      cons: [
        "Cold start latency when scaling out",
        "Complex configuration of scaling policies",
        "Can lead to thrashing if thresholds are poorly set",
        "Not instant — takes time to provision new instances",
      ],
    },
    realWorldExamples: [
      { company: "Uber", description: "Auto-scales its matching and dispatch services during peak hours and major events, handling 10x normal traffic seamlessly." },
      { company: "Disney+", description: "Leveraged auto-scaling on AWS during its global launch to handle millions of concurrent sign-ups without downtime." },
    ],
    relatedConcepts: ["horizontal-scaling", "load-balancing", "health-checks"],
    keyTakeaway: "Auto scaling bridges the gap between performance and cost. Set meaningful metrics (CPU, request count, queue depth) and test your scaling policies under load.",
  },
  {
    id: "rate-limiting",
    name: "Rate Limiting",
    categoryId: "scaling",
    difficulty: "intermediate",
    definition:
      "Rate limiting controls the number of requests a user or client can make to a service within a given time window. It protects systems from abuse, ensures fair usage, and prevents resource exhaustion.",
    importance:
      "Rate limiting is a critical defense mechanism. Without it, a single user or bot can overwhelm your system, causing denial of service for everyone.",
    story:
      "Imagine an all-you-can-eat buffet. Without rules, one person could hog the entire sushi station, filling plate after plate while everyone else waits. The buffet solves this by saying 'one plate at a time, please come back after you finish.' That's rate limiting. In tech, a single API client could fire 10,000 requests per second — whether it's a bug, a bot, or an attack. Rate limiting says 'you get 100 requests per minute. After that, you'll get a 429 Too Many Requests response. Try again in 47 seconds.' It's not about punishing users — it's about protecting the system for everyone. GitHub does this brilliantly: 5,000 API calls per hour for authenticated users, with clear X-RateLimit headers so you always know where you stand.",
    howItWorks: [
      { title: "Request arrives", description: "A client makes an API request. The system identifies the client by API key, IP address, or user ID." },
      { title: "Check the counter", description: "The rate limiter checks how many requests this client has made in the current time window." },
      { title: "Under limit? Allow it", description: "If the count is under the limit, increment the counter and process the request normally." },
      { title: "Over limit? Reject it", description: "If the count exceeds the limit, return HTTP 429 with Retry-After header telling the client when to try again." },
      { title: "Window resets", description: "When the time window expires (e.g., every minute), the counter resets and the client can make requests again." },
    ],
    deepDive: [
      { title: "Token Bucket Algorithm", content: "Imagine a bucket that fills with tokens at a steady rate (10 tokens/second). Each request costs one token. If the bucket is empty, the request is rejected. The bucket has a max capacity, allowing short bursts. This is the most popular algorithm because it handles bursty traffic gracefully while maintaining a steady average rate." },
      { title: "Sliding Window vs Fixed Window", content: "Fixed window (reset every minute at :00) has a flaw: a client could send 100 requests at 0:59 and 100 more at 1:00, getting 200 requests in 2 seconds. Sliding window fixes this by considering a rolling time period, but requires more memory. Sliding window counter is the sweet spot — it approximates sliding window with the efficiency of fixed window." },
      { title: "Distributed Rate Limiting", content: "When you have multiple API servers, each server can't track limits independently (a client could hit different servers for 100 req each). Use a centralized store like Redis with INCR and EXPIRE commands. Redis's atomic operations make this fast and consistent. In a 10-server cluster, all servers check the same Redis counter." },
    ],
    whenToUse: [
      "On all public-facing APIs",
      "When protecting against DDoS attacks",
      "When enforcing fair usage among users",
      "When monetizing API access with tiered plans",
    ],
    useCases: [
      "API rate limits (100 requests/minute per user)",
      "Login attempt throttling to prevent brute force",
      "Webhook delivery rate control",
      "SMS/email sending limits",
    ],
    tradeoffs: {
      pros: [
        "Protects system resources from abuse",
        "Ensures fair usage across clients",
        "Enables tiered pricing models",
        "Prevents cascading failures during traffic spikes",
      ],
      cons: [
        "Can block legitimate high-volume users",
        "Distributed rate limiting is complex",
        "Requires careful threshold tuning",
        "Clock synchronization issues in distributed systems",
      ],
    },
    realWorldExamples: [
      { company: "GitHub", description: "Enforces 5,000 requests per hour for authenticated API users and 60 for unauthenticated, with clear rate limit headers." },
      { company: "Stripe", description: "Rate limits API requests per account with graceful 429 responses and retry-after headers to prevent payment processing abuse." },
    ],
    relatedConcepts: ["api-gateway", "caching-strategies", "circuit-breaker"],
    keyTakeaway: "Implement rate limiting early. Use token bucket or sliding window algorithms and always return clear rate limit headers to clients.",
  },
  {
    id: "consistent-hashing",
    name: "Consistent Hashing",
    categoryId: "scaling",
    difficulty: "advanced",
    definition:
      "Consistent hashing distributes data across nodes in a way that minimizes redistribution when nodes are added or removed. Only K/N keys need remapping instead of almost all keys.",
    importance:
      "Traditional hash-based distribution breaks down when nodes change — adding one server reshuffles nearly all keys. Consistent hashing solves this, making it the foundation of distributed caches and databases.",
    story:
      "Imagine a library with 4 librarians who each manage books by author last name: A-F, G-L, M-R, S-Z. This works until you hire a 5th librarian. Now you need to reassign ALL the ranges: A-E, F-J, K-O, P-T, U-Z. Almost every book moves — chaos! Consistent hashing is smarter. Picture all the librarians sitting at desks arranged in a big circle. Each book is assigned to the nearest librarian clockwise. When a 5th librarian joins the circle, only the books between them and the next librarian need to move — maybe 20% of books instead of 80%. When a librarian leaves, their books just go to the next one clockwise. The key insight: each change only affects a small portion of the data, not everything.",
    howItWorks: [
      { title: "Create a hash ring", description: "Imagine a circle (0 to 2^32). Each server is hashed to a position on this ring." },
      { title: "Hash the data keys", description: "Each data item (e.g., user ID, cache key) is also hashed to a position on the ring." },
      { title: "Walk clockwise to find server", description: "From the data's position, walk clockwise until you hit a server. That server owns this data." },
      { title: "Add virtual nodes", description: "Each physical server gets 100-200 virtual positions on the ring for better distribution." },
      { title: "Node added or removed", description: "Only data between the new/removed node and the next clockwise node needs to move — minimal disruption." },
    ],
    deepDive: [
      { title: "The Virtual Node Trick", content: "With just 4 physical servers on the ring, data distribution is often uneven — one server might get 40% of the data. Virtual nodes solve this by placing each physical server at 150+ positions on the ring. Server A becomes A-1, A-2, ... A-150, all scattered evenly around the ring. This gives near-perfect distribution. More virtual nodes = more even distribution, but slightly more memory for the routing table." },
      { title: "What Happens During Failures", content: "When Server B crashes, all its data shifts to the next clockwise server (Server C). C temporarily handles extra load until B recovers or is replaced. This is automatic — no rehashing, no central coordinator. When B comes back, it reclaims only its portion of data from C. The rest of the system is completely unaffected." },
      { title: "Real Implementation Details", content: "In practice, you hash server names/IPs using MD5 or SHA-1 and map them to a 32-bit integer space (0 to 2^32). To find which server owns a key, binary search the sorted list of server positions to find the next clockwise position. This lookup is O(log N) where N is the number of virtual nodes. Libraries like libketama, hash_ring, and Go's consistent package provide production-ready implementations." },
    ],
    whenToUse: [
      "When distributing data across a variable number of nodes",
      "When cache nodes or database shards are added/removed dynamically",
      "When you need minimal data movement during scaling events",
      "When building any distributed hash table or ring-based system",
    ],
    useCases: [
      "Distributed cache clusters (Memcached, Redis Cluster)",
      "Database sharding with dynamic node count",
      "P2P networks and DHTs (Chord, Cassandra)",
      "Load balancer backend selection for session affinity",
    ],
    tradeoffs: {
      pros: [
        "Minimal data redistribution when nodes change",
        "Easy to add/remove nodes dynamically",
        "Virtual nodes provide better load distribution",
        "No need for centralized routing table",
      ],
      cons: [
        "Can lead to hotspots without virtual nodes",
        "More complex than simple modular hashing",
        "Requires careful virtual node configuration",
        "Non-uniform data distribution without tuning",
      ],
    },
    realWorldExamples: [
      { company: "Amazon DynamoDB", description: "Uses consistent hashing as described in the famous Dynamo paper, distributing data across storage nodes with virtual nodes for balanced load." },
      { company: "Discord", description: "Uses consistent hashing to route users to specific WebSocket servers, minimizing reconnections when servers are added or removed." },
    ],
    relatedConcepts: ["database-sharding", "horizontal-scaling", "load-balancing"],
    keyTakeaway: "Consistent hashing is essential for any distributed system that needs to add or remove nodes gracefully. Always use virtual nodes for better balance.",
  },

  // ═══════════════════════════════════════
  // DATABASE
  // ═══════════════════════════════════════
  {
    id: "database-sharding",
    name: "Database Sharding",
    categoryId: "database",
    difficulty: "advanced",
    definition:
      "Sharding splits data across multiple database instances (shards), each holding a subset of the total data. Each shard operates independently, allowing parallel processing.",
    importance:
      "When a single database can no longer handle the data volume or query load, sharding provides horizontal scalability for the data layer.",
    story:
      "Your startup's single PostgreSQL database has been a loyal companion from day one. But now you have 500 million users, and the database is groaning — writes are slow, disk is full, and queries that used to take 10ms now take 2 seconds. You've already maxed out vertical scaling (the beefiest server money can buy). You've added read replicas (but writes are still bottlenecked on one server). It's time to shard. You decide to split users across 16 database servers by hashing user_id % 16. User #12345 lives on Shard 5. User #67890 lives on Shard 10. Each shard holds ~31 million users instead of 500 million. Queries are 16x faster because they search through 16x less data. Writes are distributed across 16 servers. But now you face the hard questions: what happens when you need to find all users in a city (data is spread across all shards)? What if Shard 7 grows faster than others? These are the problems that make engineers say 'shard only when you must.'",
    howItWorks: [
      { title: "Choose a shard key", description: "Select the column used to distribute data. This is the most critical decision — usually user_id, tenant_id, or geographic region." },
      { title: "Define the sharding strategy", description: "Hash-based (user_id % N), range-based (IDs 1-1M on Shard 1), or directory-based (lookup table maps key to shard)." },
      { title: "Set up shard databases", description: "Create N independent database instances, each with the same schema but different data." },
      { title: "Add a routing layer", description: "Your application or a proxy must route each query to the correct shard based on the shard key." },
      { title: "Migrate existing data", description: "Split existing data across shards. This is usually the hardest operational step — often done gradually." },
      { title: "Handle cross-shard queries", description: "Queries that span multiple shards (e.g., global reports) require scatter-gather across all shards and merging results." },
    ],
    deepDive: [
      { title: "Choosing the Right Shard Key", content: "The shard key determines everything. A good shard key has high cardinality (many unique values), even distribution (no hotspots), and match your query patterns (most queries include the shard key). Bad example: sharding by country — the US shard would be 10x larger than others. Good example: sharding by user_id hash — evenly distributed, and most queries are per-user." },
      { title: "The Cross-Shard Join Problem", content: "Before sharding, you could JOIN users with orders freely. After sharding, if users are on Shard 3 and their orders are on Shard 7, you can't do a database-level join. Solutions: co-locate related data on the same shard (shard users AND orders by user_id), denormalize data (store user name with orders), or do application-level joins (query both shards, merge in code). None of these is free." },
      { title: "Resharding Nightmares", content: "Started with 4 shards, now need 16? If you used mod-based sharding (user_id % 4 → user_id % 16), 75% of data needs to move. This is why consistent hashing is preferred for sharding — adding shards moves only K/N data. Companies like Instagram use a shard-to-logical-shard mapping, where they pre-allocate many more logical shards than physical ones, then just remap logical shards to new physical servers without moving data." },
    ],
    whenToUse: [
      "When a single database cannot handle the write load",
      "When dataset size exceeds single-machine storage",
      "When you need to distribute data geographically",
      "After exhausting vertical scaling and read replicas",
    ],
    useCases: [
      "User data partitioned by user ID ranges or hash",
      "Multi-tenant SaaS with per-tenant databases",
      "Geographic sharding (US data in US, EU data in EU)",
      "Time-series data sharded by time ranges",
    ],
    tradeoffs: {
      pros: [
        "Horizontally scalable data layer",
        "Improved query performance on smaller datasets",
        "Data locality for geographic compliance",
        "Fault isolation — one shard failure doesn't affect others",
      ],
      cons: [
        "Cross-shard queries are expensive and complex",
        "Rebalancing shards is operationally difficult",
        "Joins across shards are nearly impossible",
        "Increased operational complexity",
      ],
    },
    realWorldExamples: [
      { company: "Instagram", description: "Shards PostgreSQL by user ID, distributing billions of photos across thousands of database shards using consistent hashing." },
      { company: "MongoDB", description: "Provides built-in auto-sharding, distributing collections across shards using shard keys for horizontal scalability." },
    ],
    relatedConcepts: ["database-replication", "consistent-hashing", "horizontal-scaling"],
    keyTakeaway: "Shard only when necessary — it's a one-way door. Choose your shard key carefully as changing it later is extremely painful.",
  },
  {
    id: "database-replication",
    name: "Database Replication",
    categoryId: "database",
    difficulty: "intermediate",
    definition:
      "Database replication creates and maintains copies of the same data across multiple database servers. A primary node handles writes while replicas handle reads.",
    importance:
      "Replication is the first step in scaling databases. It multiplies read capacity, provides data redundancy, and enables disaster recovery.",
    story:
      "Think of a popular professor who gives amazing lectures. The lecture hall seats 200, but 2,000 students want to attend. The professor can't clone himself, but the university can set up live video feeds to 10 other rooms. Students in overflow rooms see the same lecture, just with a tiny delay (replication lag). If the professor gets sick, a recorded version (failover replica) can take over. That's database replication. Your primary database is the professor — it handles all the 'writes' (creating new content). The replicas are the overflow rooms — they handle all the 'reads' (students consuming content). Since most apps are 90% reads and 10% writes, adding 3 read replicas effectively 4x your database capacity without touching the write path.",
    howItWorks: [
      { title: "Primary accepts writes", description: "All INSERT, UPDATE, DELETE operations go to the primary (master) database only." },
      { title: "Changes logged to WAL", description: "The primary writes changes to a Write-Ahead Log (WAL) / binary log before applying them." },
      { title: "Log shipped to replicas", description: "The WAL is streamed to all replica servers, either synchronously or asynchronously." },
      { title: "Replicas apply changes", description: "Each replica replays the WAL entries, bringing its data up to date with the primary." },
      { title: "Reads served from replicas", description: "Read queries are routed to replicas, spreading the read load across multiple servers." },
      { title: "Failover if primary dies", description: "If the primary fails, a replica is promoted to become the new primary. Other replicas re-point to it." },
    ],
    deepDive: [
      { title: "Synchronous vs Asynchronous", content: "Synchronous replication waits for at least one replica to confirm the write before responding to the client. Guarantee: no data loss on failover. Cost: higher write latency. Async replication responds immediately after the primary writes, shipping logs in the background. Risk: a few seconds of data loss on failover. Benefit: much lower write latency. Most systems use semi-synchronous: one replica is sync (for safety), the rest are async (for performance)." },
      { title: "Replication Lag and Its Consequences", content: "In async replication, replicas are typically 10ms-1s behind the primary. This means: User creates a post (write → primary), then immediately views their profile (read → replica) — the post might not appear yet! Solutions: 'read your own writes' consistency (route reads to primary for recently-written data), or causal consistency (track which writes each user has made and ensure reads reflect them)." },
      { title: "Multi-Master Replication", content: "Instead of single-primary, what if multiple nodes accept writes? This enables writes in multiple regions (low latency worldwide). But now you face the hardest problem in distributed systems: conflict resolution. What if two users update the same row on different masters simultaneously? Strategies: last-writer-wins (simple but lossy), merge/CRDT (complex but correct), or application-level resolution (flexible but requires custom logic)." },
    ],
    whenToUse: [
      "When read traffic significantly exceeds write traffic",
      "When you need disaster recovery capability",
      "When applications need low-latency reads from geographic regions",
      "As a stepping stone before sharding",
    ],
    useCases: [
      "Read-heavy web applications (90% reads, 10% writes)",
      "Real-time analytics dashboards reading from replicas",
      "Cross-region disaster recovery setup",
      "Reporting databases that shouldn't affect production",
    ],
    tradeoffs: {
      pros: [
        "Scales read capacity linearly with replica count",
        "Provides automatic failover for high availability",
        "Geographic distribution for lower latency",
        "Simpler than sharding to implement",
      ],
      cons: [
        "Replication lag can cause stale reads",
        "Doesn't scale write capacity",
        "Additional storage costs for replicas",
        "Conflict resolution in multi-master setups is complex",
      ],
    },
    realWorldExamples: [
      { company: "Twitter/X", description: "Uses MySQL replication with multiple read replicas to handle the massive read-heavy timeline query load." },
      { company: "Amazon RDS", description: "Offers read replicas across availability zones and regions, with automated failover through Multi-AZ deployments." },
    ],
    relatedConcepts: ["database-sharding", "cap-theorem", "eventual-consistency"],
    keyTakeaway: "Start with replication before considering sharding. It handles most scaling needs and is far simpler to operate.",
  },
  {
    id: "cap-theorem",
    name: "CAP Theorem",
    categoryId: "database",
    difficulty: "intermediate",
    definition:
      "The CAP theorem states that a distributed system can only guarantee two out of three properties: Consistency, Availability, and Partition tolerance.",
    importance:
      "CAP theorem is the fundamental constraint of distributed systems. Understanding it guides every architectural decision about data storage and consistency.",
    story:
      "You're running a bank with two branches (distributed system). Branch A in New York, Branch B in London. A customer has $1,000. The network cable between branches gets cut (partition). A customer walks into Branch A and wants to withdraw $800. What do you do? Option CP (Consistency + Partition tolerance): Refuse the withdrawal because you can't verify the London balance. The customer is angry, but the bank's books stay accurate. 'Sorry, our system is temporarily unavailable.' Option AP (Availability + Partition tolerance): Allow the withdrawal based on last known balance. The customer gets their money. But what if they simultaneously withdrew $500 in London? The bank just gave away $300 it didn't have. The CAP theorem says you MUST choose one of these during a network partition. There's no magic third option. In practice, partition tolerance isn't optional (networks always fail), so your real choice is: consistency or availability during failures?",
    howItWorks: [
      { title: "C — Consistency", description: "Every read returns the most recent write. All nodes see the same data at the same time. Like a single database." },
      { title: "A — Availability", description: "Every request gets a response (success or failure). No request is ignored. The system is always 'up'." },
      { title: "P — Partition Tolerance", description: "The system continues to work even when network messages between nodes are dropped or delayed." },
      { title: "The impossible triangle", description: "You can only guarantee 2 of these 3 properties simultaneously. During a network partition, you must choose C or A." },
      { title: "In practice: CP or AP", description: "Since partitions are inevitable in distributed systems, the real choice is between CP (consistent but sometimes unavailable) and AP (always available but sometimes stale)." },
    ],
    deepDive: [
      { title: "CP Systems in Practice", content: "CP systems refuse to serve requests during a partition rather than return stale data. Examples: MongoDB (in default config), HBase, Redis (in cluster mode). Banking systems are CP — it's better to decline a transaction than process it incorrectly. The cost: during a partition, some users see errors. The benefit: when you DO get a response, it's guaranteed correct." },
      { title: "AP Systems in Practice", content: "AP systems always respond, even if the data might be slightly stale. Examples: Cassandra, DynamoDB, CouchDB. Social media feeds are AP — seeing a like count that's 2 seconds stale is acceptable, but the system being 'down' is not. Amazon's shopping cart is famously AP: they'd rather let you add items (even if slightly inconsistent) than show you an error page. 'We can fix data inconsistency later; we can't fix a lost sale.'" },
      { title: "Beyond CAP: PACELC", content: "CAP only describes behavior during partitions. PACELC extends it: during a Partition, choose Availability or Consistency; Else (normal operation), choose Latency or Consistency. Even without partitions, there's a tradeoff between consistency and latency. Strong consistency requires consensus (multiple round trips). Eventual consistency can respond immediately from any node. DynamoDB is PA/EL (available during partitions, low latency normally). Spanner is PC/EC (consistent always, paying the latency cost of global consensus)." },
    ],
    whenToUse: [
      "When designing any distributed data system",
      "When choosing between SQL and NoSQL databases",
      "When deciding on consistency vs availability tradeoffs",
      "During system design interviews",
    ],
    useCases: [
      "Choosing CP (consistent) vs AP (available) databases",
      "Designing eventual consistency patterns",
      "Deciding between strong and eventual consistency for features",
      "Architecting multi-region data strategies",
    ],
    tradeoffs: {
      pros: [
        "Provides a clear framework for distributed system tradeoffs",
        "Helps choose the right database for use cases",
        "Guides consistency model decisions",
        "Essential vocabulary for system design discussions",
      ],
      cons: [
        "Oversimplifies real-world scenarios",
        "Partition tolerance is not really optional in practice",
        "Doesn't capture latency tradeoffs (see PACELC)",
        "Binary view of consistency is limiting",
      ],
    },
    realWorldExamples: [
      { company: "DynamoDB (AP)", description: "Amazon DynamoDB prioritizes availability and partition tolerance, offering eventual consistency by default with optional strong consistency." },
      { company: "Google Spanner (CP)", description: "Google Cloud Spanner achieves global consistency using TrueTime API with atomic clocks, sacrificing some availability during partitions." },
    ],
    relatedConcepts: ["eventual-consistency", "database-replication", "database-sharding"],
    keyTakeaway: "In practice, partition tolerance is mandatory. Your real choice is between consistency and availability during a network partition.",
  },
  {
    id: "sql-vs-nosql",
    name: "SQL vs NoSQL",
    categoryId: "database",
    difficulty: "beginner",
    definition:
      "SQL databases are relational, table-based with structured schemas and ACID transactions. NoSQL databases are non-relational with flexible schemas, offering document, key-value, wide-column, or graph models.",
    importance:
      "Choosing the right database type is one of the most impactful architectural decisions. It affects scalability, consistency, development speed, and operational complexity for years.",
    story:
      "Think of SQL as a filing cabinet with labeled folders and strict rules: every document must have the same fields, filed in the right folder, cross-referenced correctly. It's organized, reliable, and you can find anything. But try adding a new field to a million documents — that's a weekend migration. Now think of NoSQL as a big box where you can throw anything — documents of different shapes, sticky notes, photos, whatever. It's flexible and fast to change, but finding connections between items requires more work. Neither is 'better.' Would you store financial transactions in a random box? No — use SQL with its ACID guarantees. Would you design a social media feed requiring the exact same rigid structure for every post type? No — use a NoSQL document store that can handle text posts, photo posts, video posts, and poll posts all with different fields. The best systems use BOTH: SQL for core transactional data, NoSQL for everything else.",
    howItWorks: [
      { title: "SQL: Define schema first", description: "Create tables with typed columns (name VARCHAR, age INT). All rows must follow the schema. Changes require migration scripts." },
      { title: "SQL: Relationships via JOINs", description: "Related data lives in separate tables connected by foreign keys. JOINs combine them at query time." },
      { title: "SQL: ACID transactions", description: "Multiple operations execute as one atomic unit. Either all succeed or all rollback. Guaranteed consistency." },
      { title: "NoSQL: Schema-flexible storage", description: "Store documents/objects as-is. Each document can have different fields. No migration needed for new fields." },
      { title: "NoSQL: Denormalized data", description: "Related data is often embedded within documents (no JOINs needed). Trades storage for read performance." },
      { title: "NoSQL: Horizontal scaling built-in", description: "Most NoSQL databases are designed to distribute data across many nodes from the start." },
    ],
    deepDive: [
      { title: "The Four Types of NoSQL", content: "Document stores (MongoDB, Firestore): Store JSON-like documents. Great for content, catalogs, user profiles. Key-value stores (Redis, DynamoDB): Simple get/set by key. Blazing fast for caching, sessions, config. Wide-column stores (Cassandra, HBase): Like a key-value store where the value is a sorted map. Ideal for time-series, event logging. Graph databases (Neo4j, Neptune): Store nodes and edges. Purpose-built for social networks, recommendation engines, fraud detection." },
      { title: "When SQL Wins", content: "Complex queries with multiple JOINs, aggregations, and subqueries. ACID transactions where money or inventory is involved. Well-defined, stable schemas that won't change frequently. Reporting and analytics (SQL's declarative query language is incredibly powerful). If your data naturally fits in tables with clear relationships, SQL is almost always the right choice." },
      { title: "Polyglot Persistence", content: "Real systems use multiple databases. Uber uses MySQL for trip data (relational, needs ACID), Redis for real-time geolocation (fast key-value lookups), Cassandra for driver/rider activity logs (high-write-throughput time-series), and Elasticsearch for search. Each database type excels at specific access patterns. Choosing one database for everything is like using a hammer for every task." },
    ],
    whenToUse: [
      "SQL: When data has clear relationships and structured schemas",
      "SQL: When ACID transactions are required",
      "NoSQL: When schema flexibility and rapid iteration are needed",
      "NoSQL: When horizontal scalability is the priority",
    ],
    useCases: [
      "SQL: Banking systems, ERP, order management",
      "NoSQL Document: User profiles, content management",
      "NoSQL Key-Value: Session storage, caching, leaderboards",
      "NoSQL Graph: Social networks, recommendation engines",
    ],
    tradeoffs: {
      pros: [
        "SQL: Strong consistency, mature tooling, powerful joins",
        "SQL: ACID compliance for critical transactions",
        "NoSQL: Flexible schema for evolving data models",
        "NoSQL: Built for horizontal scaling and high throughput",
      ],
      cons: [
        "SQL: Harder to scale horizontally",
        "SQL: Schema migrations can be painful",
        "NoSQL: Limited join support and complex queries",
        "NoSQL: Eventual consistency can complicate app logic",
      ],
    },
    realWorldExamples: [
      { company: "Airbnb", description: "Uses MySQL for bookings and payments requiring ACID, and Elasticsearch for lightning-fast property search." },
      { company: "Facebook", description: "Uses MySQL for core social data, TAO (graph-like NoSQL) for the social graph, and Cassandra for inbox search." },
    ],
    relatedConcepts: ["cap-theorem", "database-sharding", "database-replication"],
    keyTakeaway: "Don't pick a database based on hype. Match the data model to your access patterns. Most large systems use both SQL and NoSQL.",
  },
  {
    id: "database-indexing",
    name: "Database Indexing",
    categoryId: "database",
    difficulty: "beginner",
    definition:
      "A database index is a data structure (typically B-tree or hash) that speeds up data retrieval at the cost of additional storage and slower writes.",
    importance:
      "The difference between an indexed and unindexed query can be 100x-10,000x in performance. Proper indexing is the single most impactful database optimization.",
    story:
      "Imagine you have a 1,000-page book and need to find every mention of 'distributed systems.' Without an index, you'd read every single page — that's a full table scan. It takes hours. Now flip to the back of the book — there's an index listing 'distributed systems: pages 42, 156, 298, 445.' You go directly to those pages in seconds. Database indexes work exactly the same way. When you CREATE INDEX idx_email ON users(email), the database builds a sorted tree structure pointing to where each email lives on disk. Instead of scanning 10 million rows to find john@example.com, it traverses a tree 20 levels deep and finds it in microseconds. The cost? Every time you INSERT a new user, the database must also update the index tree. That's why you don't index everything — each index slows writes and uses disk space.",
    howItWorks: [
      { title: "Create an index", description: "Tell the database which column(s) to index: CREATE INDEX idx_name ON users(email). This builds a B-tree structure." },
      { title: "B-tree structure built", description: "The database creates a balanced tree where each node points to ranges of values. The tree is typically 3-5 levels deep." },
      { title: "Query uses the index", description: "When you query WHERE email = 'john@example.com', the optimizer chooses the index instead of a full table scan." },
      { title: "Tree traversal (fast)", description: "The database traverses the B-tree: root → internal node → leaf node → exact row pointer. ~3-5 disk reads instead of millions." },
      { title: "Row retrieved", description: "The leaf node contains a pointer to the actual row on disk. The database fetches just that one row." },
    ],
    deepDive: [
      { title: "B-tree vs Hash vs GIN", content: "B-tree (default): Works for equality (=) and range queries (<, >, BETWEEN). Keeps data sorted. Best general-purpose index. Hash: Only works for equality (=), but is faster for exact lookups. Can't do range queries. GIN (Generalized Inverted Index): Used for full-text search, array containment, JSONB queries. Indexes every element in an array/document. GiST: For geometric data, full-text search, and custom types." },
      { title: "Composite Indexes and Column Order", content: "A composite index on (last_name, first_name) works for queries on last_name alone, or (last_name AND first_name), but NOT for first_name alone. Think of it like a phone book sorted by last name, then first name. You can find all 'Smiths' easily, all 'John Smiths' easily, but finding all 'Johns' requires scanning the entire book. Rule of thumb: put the highest-cardinality column first, but prioritize the column most often used in WHERE clauses." },
      { title: "Index-Only Scans (Covering Indexes)", content: "If an index contains ALL the columns a query needs, the database never touches the actual table — it answers entirely from the index. Example: CREATE INDEX idx_cover ON orders(user_id, created_at, total). The query SELECT total FROM orders WHERE user_id = 123 ORDER BY created_at is answered purely from the index. This can be 10x faster than a regular index scan because it avoids random I/O to the main table." },
    ],
    whenToUse: [
      "On columns used in WHERE, JOIN, and ORDER BY clauses",
      "When queries are slow due to full table scans",
      "On foreign keys for efficient joins",
      "On columns with high cardinality (many unique values)",
    ],
    useCases: [
      "Index on user.email for login lookups",
      "Composite index on (user_id, created_at) for activity feeds",
      "Partial index on active users only",
      "Full-text index for search functionality",
    ],
    tradeoffs: {
      pros: [
        "Dramatically speeds up read queries",
        "Enables efficient sorting and range queries",
        "Composite indexes serve multiple query patterns",
        "Partial indexes reduce storage for selective queries",
      ],
      cons: [
        "Slower write performance (insert, update, delete)",
        "Additional storage space required",
        "Too many indexes can actually hurt performance",
        "Index maintenance overhead during bulk operations",
      ],
    },
    realWorldExamples: [
      { company: "Stack Overflow", description: "Uses carefully designed SQL Server indexes to serve 1.3 billion page views per month on just a few database servers." },
      { company: "PostgreSQL", description: "Offers B-tree, Hash, GiST, GIN, and BRIN index types, each optimized for different query patterns and data types." },
    ],
    relatedConcepts: ["sql-vs-nosql", "database-replication", "database-sharding"],
    keyTakeaway: "Use EXPLAIN ANALYZE before and after adding indexes. Over-indexing is almost as bad as under-indexing — every index slows writes.",
  },
  {
    id: "eventual-consistency",
    name: "Eventual Consistency",
    categoryId: "database",
    difficulty: "intermediate",
    definition:
      "Eventual consistency is a model where, given enough time without new writes, all replicas converge to the same value. Weaker than strong consistency but enables higher availability.",
    importance:
      "Most large-scale systems use eventual consistency for at least some data. Understanding it is crucial for making informed tradeoffs.",
    story:
      "You post a photo on Instagram. You see it immediately on your phone (your write was confirmed). Your friend in Tokyo opens Instagram 2 seconds later — they don't see it yet. 5 seconds later, they refresh — there it is. That's eventual consistency. The photo was written to the primary database in Virginia, and it took a few seconds to replicate to the Tokyo data center. During those few seconds, different users saw different 'versions' of reality. Was that a problem? Not at all — nobody expects Instagram likes to be real-time accurate to the millisecond. But imagine if a bank used eventual consistency for account balances. You check your balance: $1,000. Your partner checks simultaneously from another city: also $1,000. You both withdraw $800. Congratulations, the bank just lost $600. For banks, you need strong consistency. For Instagram likes, eventual consistency is not just acceptable — it's optimal.",
    howItWorks: [
      { title: "Write accepted by one node", description: "The client writes data to one node, which immediately confirms the write. Done from the client's perspective." },
      { title: "Asynchronous replication begins", description: "The node starts propagating the change to other replicas in the background. This is non-blocking." },
      { title: "Replicas receive the update", description: "Other nodes receive and apply the update. This takes milliseconds to seconds depending on network distance." },
      { title: "Temporal inconsistency window", description: "During replication, different nodes may return different values for the same key. Readers see stale data." },
      { title: "All replicas converge", description: "Once replication completes, all nodes return the same value. The system is consistent again — until the next write." },
    ],
    deepDive: [
      { title: "Read-Your-Own-Writes Consistency", content: "The most jarring UX issue with eventual consistency: you update your profile name, refresh the page, and it still shows the old name. Solution: after a write, route that specific user's reads to the primary (or the replica that received the write) for a short window (5-10 seconds). Everyone else can read from any replica. Most users only notice staleness for their own changes, not others'." },
      { title: "Conflict Resolution Strategies", content: "When two replicas independently accept conflicting writes to the same key, you need a deterministic resolution strategy. Last-Write-Wins (LWW): Use timestamps; the latest write wins. Simple but can lose data. Vector Clocks: Track causal ordering of events across nodes. Complex but detects true conflicts. CRDTs (Conflict-free Replicated Data Types): Data structures mathematically guaranteed to merge correctly. Counters, sets, and registers that automatically resolve conflicts without coordination." },
      { title: "Tunable Consistency", content: "Many databases (Cassandra, DynamoDB) let you choose consistency per-query. Read from 1 node: fastest, most stale. Read from majority (quorum): slower, but strongly consistent (if writes also use quorum). Read from ALL nodes: slowest, perfectly consistent. The formula: if R + W > N (R=read replicas, W=write replicas, N=total replicas), you get strong consistency. Example: N=3, W=2, R=2 → 2+2 > 3 → strong consistency." },
    ],
    whenToUse: [
      "When availability is more important than immediate consistency",
      "When data changes can tolerate seconds of propagation delay",
      "When operating across multiple data centers or regions",
      "When the data model is naturally append-only or commutative",
    ],
    useCases: [
      "Social media like counts and follower counts",
      "Product catalog and pricing (with short cache TTLs)",
      "Shopping cart in a distributed session store",
      "DNS propagation across global nameservers",
    ],
    tradeoffs: {
      pros: [
        "Higher availability during network partitions",
        "Lower latency for reads and writes",
        "Better scalability across regions",
        "Simpler write paths without consensus protocols",
      ],
      cons: [
        "Users may see stale data temporarily",
        "Application logic must handle inconsistencies",
        "Conflict resolution can be complex",
        "Harder to reason about than strong consistency",
      ],
    },
    realWorldExamples: [
      { company: "Amazon", description: "Shopping cart uses eventual consistency — items always get added (high availability) even if briefly inconsistent, which is better than losing a sale." },
      { company: "Cassandra", description: "Offers tunable consistency levels per query, from ONE (eventual) to ALL (strong), letting developers choose the right tradeoff per operation." },
    ],
    relatedConcepts: ["cap-theorem", "database-replication", "caching-strategies"],
    keyTakeaway: "Eventual consistency isn't a bug — it's a feature. Embrace it for data that can tolerate short delays, and use strong consistency only where truly needed.",
  },

  // ═══════════════════════════════════════
  // CACHING
  // ═══════════════════════════════════════
  {
    id: "caching-strategies",
    name: "Caching Strategies",
    categoryId: "caching",
    difficulty: "intermediate",
    definition:
      "Caching strategies define how data is stored and retrieved from a fast-access cache layer. Key patterns include Cache-Aside, Write-Through, Write-Behind, and Read-Through.",
    importance:
      "The right caching strategy can reduce database load by 90%+, cut response times from seconds to milliseconds, and dramatically reduce infrastructure costs.",
    story:
      "You're a librarian. Students constantly ask for the same 50 popular books. Each time, you walk to the back warehouse (database), find the book, walk back, and hand it over. 200 trips a day for the same 50 books. Exhausting. So you set up a small shelf behind your desk (cache) with copies of the 50 most popular books. Now when a student asks for 'Introduction to Algorithms,' you grab it from the shelf in 2 seconds instead of walking to the warehouse for 2 minutes. That's Cache-Aside: check the shelf first, go to warehouse only if it's not there, then put a copy on the shelf for next time. But what happens when the warehouse gets a new edition of a book? Your shelf has the old one. That's the cache invalidation problem — the hardest problem in computing. Do you check the warehouse every hour? Every time someone asks? Only when the warehouse tells you? Each strategy has tradeoffs.",
    howItWorks: [
      { title: "Cache-Aside (Lazy Loading)", description: "App checks cache first. Miss? Query DB, store result in cache, return. Hit? Return cached data directly. App manages the cache." },
      { title: "Read-Through", description: "App asks cache. Miss? The cache itself queries the DB, stores the result, and returns it. Cache manages data loading." },
      { title: "Write-Through", description: "App writes to cache first. Cache synchronously writes to DB. Ensures cache is always consistent with DB." },
      { title: "Write-Behind (Write-Back)", description: "App writes to cache. Cache acknowledges immediately. Cache async-writes to DB later in batches. Fast writes, eventual DB consistency." },
      { title: "Set TTL (Time to Live)", description: "Every cached item gets an expiration time. After TTL expires, the next request triggers a fresh load from DB." },
    ],
    deepDive: [
      { title: "Cache-Aside: The Most Common Pattern", content: "90% of applications use cache-aside. Your code looks like: result = cache.get(key). If null → result = db.query(...) → cache.set(key, result, TTL=300) → return result. The beauty is simplicity. The risk: between a DB update and cache expiration, users see stale data. Mitigation: invalidate the cache key immediately on writes (cache.delete(key) after db.update(...)). This is simple but requires discipline across all write paths." },
      { title: "The Thundering Herd Problem", content: "A cached item with millions of reads expires. Suddenly, thousands of concurrent requests all see a cache miss and simultaneously hit the database. The DB gets crushed. Solutions: (1) Cache stampede protection / request coalescing: only the first miss queries the DB; others wait for that result. (2) Jittered TTLs: instead of all keys expiring at TTL=300s, use TTL=random(270,330). (3) Early recompute: refresh the cache before it expires (at 80% of TTL)." },
      { title: "Multi-Layer Caching", content: "Real systems use multiple cache layers. L1: In-process cache (HashMap) — 0.001ms latency, limited by server memory. L2: Distributed cache (Redis) — 0.5ms latency, shared across servers. L3: CDN cache — for static or semi-static content. L4: Database query cache — built-in, but often less effective. Each layer catches progressively more misses. Netflix's architecture hits the database for less than 1% of requests thanks to 4 cache layers." },
    ],
    whenToUse: [
      "Cache-Aside: When cache misses are acceptable and data changes infrequently",
      "Write-Through: When data consistency between cache and DB is critical",
      "Write-Behind: When write performance is critical and eventual consistency is acceptable",
      "Read-Through: When you want the cache to manage data loading transparently",
    ],
    useCases: [
      "Cache-Aside: Product catalog, user profiles, configuration data",
      "Write-Through: Shopping cart, session data",
      "Write-Behind: Logging, analytics event ingestion",
      "Read-Through: Content feeds, recommendation results",
    ],
    tradeoffs: {
      pros: [
        "Dramatically reduces database load and latency",
        "Improves user experience with faster responses",
        "Reduces infrastructure costs",
        "Absorbs traffic spikes without DB overload",
      ],
      cons: [
        "Cache invalidation is notoriously difficult",
        "Stale data risk if TTLs are misconfigured",
        "Additional infrastructure to manage",
        "Cold cache problems during restarts or deployments",
      ],
    },
    realWorldExamples: [
      { company: "Reddit", description: "Uses Memcached and Redis cache-aside pattern to serve millions of page views, caching post rankings, user data, and rendered content." },
      { company: "Amazon", description: "Uses write-through caching for shopping cart persistence and cache-aside for product catalog data." },
    ],
    relatedConcepts: ["redis-memcached", "cdn", "cache-invalidation"],
    keyTakeaway: "'There are only two hard things in computer science: cache invalidation and naming things.' Choose your strategy based on consistency requirements.",
  },
  {
    id: "redis-memcached",
    name: "Redis & Memcached",
    categoryId: "caching",
    difficulty: "beginner",
    definition:
      "Redis and Memcached are in-memory data stores used for caching. Redis supports rich data structures. Memcached is simpler, focused purely on key-value caching.",
    importance:
      "In-memory caches are the workhorses of modern architectures, sitting between applications and databases.",
    story:
      "Redis is the Swiss Army knife of databases. It started as a simple cache but evolved into a data structure server. Need a cache? Redis. Need a message queue? Redis pub/sub. Need a leaderboard? Redis sorted sets. Need rate limiting? Redis with INCR and EXPIRE. Need session storage? Redis hashes. Need distributed locks? Redis with SETNX. Memcached, on the other hand, is like a race car — it does one thing (key-value caching) and does it incredibly fast. No data structures, no persistence, no pub/sub. Just GET and SET, blindingly fast, multi-threaded, and memory-efficient. The decision is usually simple: if you need just caching, both work (Memcached is slightly faster). If you need anything beyond basic caching, choose Redis.",
    howItWorks: [
      { title: "Data stored in RAM", description: "Both store data entirely in memory. RAM is ~100x faster than SSD, which is why cache lookups take <1ms." },
      { title: "Key-value operations", description: "Basic operations: SET key value, GET key, DELETE key. Both support TTL (expiration) on keys." },
      { title: "Redis: Rich data structures", description: "Redis adds Strings, Lists, Sets, Sorted Sets, Hashes, Streams, HyperLogLog, Bitmaps, and Geospatial indexes." },
      { title: "Eviction when memory full", description: "When RAM is exhausted, eviction policies remove old data: LRU (least recently used), LFU, random, or no-eviction." },
      { title: "Optional persistence (Redis)", description: "Redis can save snapshots (RDB) or append-only logs (AOF) to disk for durability. Memcached loses everything on restart." },
    ],
    deepDive: [
      { title: "Redis Data Structures and Use Cases", content: "Sorted Sets: Leaderboards — ZADD leaderboard 1500 'player1'. Get top 10 with ZREVRANGE. O(log N) insert, O(K) top-K retrieval. HyperLogLog: Count unique visitors — PFADD visitors 'user123'. PFCOUNT returns approximate unique count using only 12KB of memory for billions of elements. 0.81% error rate. Streams: Like Kafka but inside Redis — append-only log with consumer groups. Great for event sourcing, activity feeds, and lightweight messaging. Pub/Sub: Real-time messaging — SUBSCRIBE channel, PUBLISH channel message. Powers chat systems, notifications, and live updates." },
      { title: "Redis vs Memcached: The Detailed Comparison", content: "Threading: Redis is single-threaded (simple, no locks, but CPU-bound on one core). Memcached is multi-threaded (better CPU utilization on multi-core machines). Memory: Memcached stores raw bytes more efficiently. Redis stores typed data structures with overhead. Persistence: Redis has RDB + AOF. Memcached has none — it's volatile. Clustering: Redis Cluster provides auto-sharding with 16,384 hash slots. Memcached relies on client-side consistent hashing. Verdict: Use Redis for 95% of cases. Use Memcached when you need maximum raw throughput for simple caching and don't need data structures or persistence." },
      { title: "Redis Anti-Patterns", content: "Don't use Redis as your primary database. It's in-memory — at $50/GB, storing 1TB costs $50,000/month vs $100/month in PostgreSQL. Common mistakes: storing large BLOBs (>1MB values kill performance), using KEYS command (blocks everything, O(N)), not setting maxmemory (Redis will consume all RAM and get OOM-killed), and not monitoring hit rate (below 90% means your cache is ineffective)." },
    ],
    whenToUse: [
      "Redis: When you need rich data structures (sorted sets, lists, hashes)",
      "Redis: When you need pub/sub, Lua scripting, or persistence",
      "Memcached: When you need simple key-value caching at massive scale",
      "Memcached: When memory efficiency is paramount",
    ],
    useCases: [
      "Redis: Session storage, real-time leaderboards, rate limiting",
      "Redis: Pub/sub messaging, job queues, feature flags",
      "Memcached: HTML fragment caching, database query caching",
      "Memcached: Simple session caching in high-throughput environments",
    ],
    tradeoffs: {
      pros: [
        "Sub-millisecond response times",
        "Redis offers rich data structures and persistence",
        "Both are battle-tested at massive scale",
        "Redis supports clustering and replication natively",
      ],
      cons: [
        "Data is in memory — expensive at scale",
        "Redis single-threaded for commands (can bottleneck on CPU)",
        "Memcached has no persistence or replication",
        "Redis complexity can lead to misuse as a primary database",
      ],
    },
    realWorldExamples: [
      { company: "Twitter/X", description: "Uses Redis for timeline caching and rate limiting, and Memcached for general caching across its infrastructure." },
      { company: "Pinterest", description: "Uses Redis sorted sets for real-time follower feeds and recommendation scoring, handling billions of pins." },
    ],
    relatedConcepts: ["caching-strategies", "cache-invalidation", "pub-sub"],
    keyTakeaway: "Use Redis when you need data structures beyond simple key-value. Use Memcached for pure caching at scale. Many large systems use both.",
  },
  {
    id: "cache-invalidation",
    name: "Cache Invalidation",
    categoryId: "caching",
    difficulty: "advanced",
    definition:
      "Cache invalidation is the process of removing or updating stale data from a cache when the underlying source data changes.",
    importance:
      "Serving stale data can cause serious bugs — showing wrong prices, outdated inventory, or incorrect user permissions.",
    story:
      "Phil Karlton famously said: 'There are only two hard problems in computer science: cache invalidation and naming things.' Here's why it's so hard. You're running an e-commerce site. Product X costs $99. It's cached everywhere: browser cache, CDN, Redis, application cache. You update the price to $79 for a flash sale. But which caches did you invalidate? The Redis cache? Updated. The CDN edge cache in 47 countries? Still showing $99 for the next 2 minutes. The mobile app's local cache? Still $99 until the user force-refreshes. The Google Shopping feed? Still $99 for the next hour. Meanwhile, customers see $99 on the listing page but $79 at checkout. They're confused, trust decreases, support tickets increase. NOW multiply this by 10 million products, 3 cache layers, 50 CDN edge locations, and 4 client types. Welcome to cache invalidation at scale.",
    howItWorks: [
      { title: "TTL-based expiration", description: "Set a Time-To-Live on each cache entry. After it expires, the next read triggers a fresh load. Simple but imprecise." },
      { title: "Event-driven invalidation", description: "When data changes, publish an event. Cache listeners receive it and delete/update the affected keys immediately." },
      { title: "Write-through invalidation", description: "Every write goes through the cache. The cache updates itself and the database simultaneously. Always consistent." },
      { title: "Version-based invalidation", description: "Include a version number in cache keys (product:123:v5). On update, increment version — old keys naturally become unused." },
      { title: "Purge APIs", description: "CDNs provide purge endpoints to manually invalidate cached content by URL, tag, or pattern." },
    ],
    deepDive: [
      { title: "The Delete vs Update Debate", content: "When data changes, should you delete the cache key or update it? Delete (invalidate): Simpler. Next read will fetch fresh data. But creates a brief window where the cache is cold (thundering herd risk). Update: Keeps cache always warm. But what if the update fails? Now your cache has stale data and you don't know it. Best practice: Delete the cache key, and use cache stampede protection (mutex/lock) to prevent thundering herd. Only one request fetches from DB; others wait for the result." },
      { title: "Facebook's Cache Invalidation Pipeline", content: "Facebook's approach is legendary. They tail the MySQL binary log (a stream of all database changes). A daemon called 'mcsqueal' reads these changes and publishes invalidation messages to Memcached clusters. In another region, 'mcrouter' (their Memcached router) receives cross-region invalidation events. This ensures that a write in one data center invalidates caches globally within seconds. The key insight: use the database's own changelog as the source of truth for invalidation, not application code. This eliminates the 'forgot to invalidate' class of bugs entirely." },
      { title: "Cache Tags for Group Invalidation", content: "Problem: a blog post has content cache, comment count cache, author cache, and category list cache. When the post is updated, you need to invalidate all of them. Tracking individual keys is error-prone. Solution: tag all related caches with 'post:456'. When post 456 changes, invalidate all entries tagged 'post:456'. CDNs like Cloudflare and Fastly support cache tags natively. In Redis, use Sets: SADD 'tag:post:456' 'key1' 'key2' 'key3', then delete all keys in the set on invalidation." },
    ],
    whenToUse: [
      "When cached data changes frequently in the source",
      "When data correctness is more important than cache hit rate",
      "When multiple services share cached data",
      "When implementing real-time features on cached data",
    ],
    useCases: [
      "Invalidating product price cache after admin update",
      "Clearing user session cache on password change",
      "Updating CDN cached pages when content is published",
      "Invalidating computed results when input data changes",
    ],
    tradeoffs: {
      pros: [
        "Ensures data freshness and correctness",
        "Reduces stale data bugs",
        "Event-driven invalidation is very precise",
        "TTL provides a safety net for eventual consistency",
      ],
      cons: [
        "Complex to implement correctly at scale",
        "Over-invalidation reduces cache effectiveness",
        "Thundering herd problem when popular keys expire",
        "Distributed invalidation requires pub/sub or messaging",
      ],
    },
    realWorldExamples: [
      { company: "Facebook", description: "Uses McRouter and mcsqueal that tails MySQL binlogs to invalidate Memcached keys when database rows change." },
      { company: "Cloudflare", description: "Provides instant cache purge APIs and cache tags that allow granular invalidation across global edge nodes." },
    ],
    relatedConcepts: ["caching-strategies", "redis-memcached", "pub-sub"],
    keyTakeaway: "Always set TTLs as a safety net, even with event-driven invalidation. Use jittered TTLs and cache stampede protection.",
  },

  // ═══════════════════════════════════════
  // MESSAGING & QUEUES
  // ═══════════════════════════════════════
  {
    id: "message-queues",
    name: "Message Queues",
    categoryId: "messaging",
    difficulty: "beginner",
    definition:
      "Message queues provide asynchronous communication by allowing producers to send messages to a queue and consumers to process them independently.",
    importance:
      "Message queues decouple services, enable async processing, smooth traffic spikes, and ensure no work is lost.",
    story:
      "Think of a message queue like a restaurant's order ticket system. The waiter (producer) writes your order on a ticket and puts it on the rail. The cook (consumer) pulls tickets off the rail and makes dishes one at a time. The waiter doesn't wait at the kitchen window — they go serve other tables. If 50 orders come in during the dinner rush, they all queue up on the rail. The cooks work through them steadily. No orders are lost, the waiters aren't blocked, and the kitchen handles the surge at its own pace. Without the rail (queue), the waiter would stand at the window shouting orders while the cook juggles everything simultaneously. If the cook drops something, the order is lost. If the cook is slow, the waiter is stuck waiting. That's the difference between synchronous (REST API calls) and asynchronous (message queue) communication.",
    howItWorks: [
      { title: "Producer sends message", description: "The application creates a message (JSON payload) and sends it to a named queue. The queue acknowledges receipt." },
      { title: "Message persisted in queue", description: "The queue durably stores the message (usually on disk). Even if the broker restarts, the message survives." },
      { title: "Consumer polls for messages", description: "Consumer processes pull messages from the queue. Multiple consumers can pull from the same queue for parallelism." },
      { title: "Message processed", description: "The consumer processes the message — sending an email, updating a database, generating a report, etc." },
      { title: "Acknowledgment sent", description: "After successful processing, the consumer ACKs the message. The queue removes it permanently." },
      { title: "Failed? Retry or dead-letter", description: "If processing fails, the message is re-queued for retry. After max retries, it goes to a dead-letter queue for investigation." },
    ],
    deepDive: [
      { title: "At-Least-Once vs Exactly-Once", content: "At-least-once: If a consumer crashes after processing but before ACKing, the message is re-delivered. Your consumer might process the same message twice. Solution: make your processing idempotent — processing the same message twice should have the same effect as once. Example: use UPSERT instead of INSERT, or check if an email was already sent before sending again. Exactly-once: Theoretically impossible in distributed systems (see FLP impossibility). Kafka achieves 'effectively exactly-once' within its ecosystem using transactional producers and consumers, but only within Kafka-to-Kafka processing." },
      { title: "Message Ordering Guarantees", content: "FIFO (First-In-First-Out) queues guarantee order but reduce throughput (only one consumer). Standard queues offer higher throughput but may deliver messages out of order. SQS FIFO queues provide ordering within a 'message group' — so you can have ordered processing per-user while processing different users in parallel. Kafka guarantees ordering within a partition but not across partitions — it's your job to put related messages in the same partition." },
      { title: "Choosing: RabbitMQ vs SQS vs Kafka", content: "RabbitMQ: Best for complex routing (topic exchanges, headers routing, dead-letter policies). Great for traditional job queues. Self-managed but powerful. SQS: Best for simplicity. Fully managed, infinitely scalable, dirt cheap. No infrastructure to manage. Perfect for 80% of use cases. Kafka: Best for event streaming (multiple consumers, replay, high throughput). Overkill for simple job queues but essential for data pipelines and event sourcing." },
    ],
    whenToUse: [
      "When tasks can be processed asynchronously",
      "When you need to decouple service dependencies",
      "When traffic is bursty and you need to buffer requests",
      "When you need guaranteed delivery or at-least-once processing",
    ],
    useCases: [
      "Email/notification sending after user actions",
      "Order processing pipelines",
      "Image/video processing and transcoding",
      "Webhook delivery with retry logic",
    ],
    tradeoffs: {
      pros: [
        "Decouples producers from consumers",
        "Handles traffic spikes by buffering messages",
        "Enables retry and dead-letter processing",
        "Improves system resilience and fault tolerance",
      ],
      cons: [
        "Adds eventual consistency (not real-time)",
        "Message ordering can be complex",
        "Dead letter queues need monitoring",
        "Increases system complexity and debugging difficulty",
      ],
    },
    realWorldExamples: [
      { company: "Shopify", description: "Uses message queues to process orders asynchronously, handling millions of checkout events during flash sales like Black Friday." },
      { company: "Slack", description: "Uses job queues for message delivery, notification dispatch, and search indexing, ensuring reliable delivery across millions of users." },
    ],
    relatedConcepts: ["event-streaming", "pub-sub"],
    keyTakeaway: "If a task doesn't need an immediate response, put it in a queue. This simple principle dramatically improves system resilience.",
  },
  {
    id: "event-streaming",
    name: "Event Streaming (Kafka)",
    categoryId: "messaging",
    difficulty: "advanced",
    definition:
      "Event streaming platforms like Apache Kafka provide a distributed, durable, append-only log of events that multiple consumers can process independently.",
    importance:
      "Event streaming enables real-time data pipelines, event sourcing, and stream processing at massive scale.",
    story:
      "Imagine a newspaper's printing press vs. a TV news broadcast. A traditional message queue is like a newspaper — once a reader picks up a copy, that copy is gone. If a new reader arrives, they can't read yesterday's paper. Kafka is like a TV broadcast with DVR recording. Everyone watches the same broadcast (topic). Different viewers (consumer groups) watch at their own pace. You can rewind (replay) to watch something you missed. New viewers can start from the beginning and catch up. The recording isn't deleted after watching — it stays for days or weeks. This changes everything. With Kafka, you don't just process events and throw them away. You keep them in an ordered, durable log. Your analytics team can replay last week's events to test a new recommendation algorithm. Your search team can rebuild their entire index from the event log. A new microservice can consume the entire history of events to build its initial state. The log IS the database.",
    howItWorks: [
      { title: "Producer writes to topic", description: "The application publishes an event to a Kafka topic. The event is appended to a partition log." },
      { title: "Topic partitioned for parallelism", description: "Each topic is split into N partitions distributed across brokers. Events are ordered within each partition." },
      { title: "Partition key determines placement", description: "The producer specifies a key (e.g., user_id). All events with the same key go to the same partition, preserving order." },
      { title: "Consumer groups read independently", description: "Different consumer groups (analytics, search, notifications) each read all events at their own pace and offset." },
      { title: "Offset tracking", description: "Each consumer group tracks its position (offset) in each partition. It can resume from where it left off after restarts." },
      { title: "Retention policy", description: "Events are retained for a configurable period (7 days, forever) or until a size limit. Old events are deleted or compacted." },
    ],
    deepDive: [
      { title: "Topics, Partitions, and Consumer Groups", content: "A topic is a logical category ('orders', 'user-events'). Each topic has N partitions for parallelism. Within a consumer group, each partition is assigned to exactly one consumer. So 12 partitions = max 12 parallel consumers per group. Key insight: if you have 12 partitions and 15 consumers, 3 consumers sit idle. If you have 12 partitions and 4 consumers, each consumer handles 3 partitions. Partition count is the unit of parallelism." },
      { title: "Event Sourcing with Kafka", content: "Traditional: store the current state. 'Account balance = $500.' Event sourcing: store the events that led to the state. 'Deposited $1000. Withdrew $300. Withdrew $200.' You can always derive current state by replaying events. Benefits: complete audit trail, can rebuild any point-in-time state, decouples write model from read model (CQRS). Kafka's durable, ordered log is the perfect backbone for event sourcing. It's how banks actually work — they store transactions (events), not just the final balance." },
      { title: "Stream Processing", content: "Kafka Streams or Apache Flink process events in real-time as they flow through Kafka. Use cases: Real-time fraud detection: every transaction event is analyzed against fraud patterns within milliseconds. Real-time recommendations: aggregate click events in sliding windows to compute trending items. ETL replacement: instead of nightly batch jobs that take hours, transform data in real-time as it flows from source to destination. Stream processing turns Kafka from a message broker into a real-time data processing platform." },
    ],
    whenToUse: [
      "When multiple consumers need to process the same events",
      "When you need event replay and audit trails",
      "When building real-time data pipelines",
      "When event ordering within a partition is critical",
    ],
    useCases: [
      "Real-time analytics and dashboards",
      "Change data capture (CDC) from databases",
      "Activity tracking and user behavior streams",
      "Microservice event-driven communication",
    ],
    tradeoffs: {
      pros: [
        "Extremely high throughput (millions of events/sec)",
        "Durable storage — events can be replayed",
        "Multiple consumer groups process independently",
        "Strong ordering guarantees within partitions",
      ],
      cons: [
        "Operationally complex to manage",
        "Consumer offset management is non-trivial",
        "Not ideal for point-to-point request-reply patterns",
        "Requires careful partition key design",
      ],
    },
    realWorldExamples: [
      { company: "LinkedIn", description: "Created Kafka to handle 7+ trillion messages per day for activity tracking, metrics, and real-time data pipelines." },
      { company: "Uber", description: "Uses Kafka for real-time trip event processing, driver matching, surge pricing calculations, and analytics." },
    ],
    relatedConcepts: ["message-queues", "pub-sub"],
    keyTakeaway: "Use Kafka when you need a durable, replayable event log with multiple consumers. For simple job queues, stick with RabbitMQ or SQS.",
  },
  {
    id: "pub-sub",
    name: "Publish-Subscribe Pattern",
    categoryId: "messaging",
    difficulty: "intermediate",
    definition:
      "Pub/Sub is a messaging pattern where publishers send messages to topics without knowing receivers, and subscribers receive messages from topics they've subscribed to.",
    importance:
      "Pub/Sub is the fundamental pattern for event-driven architectures, enabling loose coupling and fan-out communication.",
    story:
      "Think of a YouTube channel. The creator (publisher) uploads a video. They don't know or care who watches it. They don't send it to each viewer individually. They just publish it to their channel (topic). Meanwhile, different subscribers watch the same video for different reasons. A student watches it to learn. A competitor watches it for research. A fan watches for entertainment. New subscribers can join anytime without the creator knowing. If a subscriber unsubscribes, the creator doesn't change anything. This is radical decoupling. In system design, the 'new user signed up' event is published once. The email service sends a welcome email. The analytics service tracks the conversion. The CRM service creates a contact. The referral service credits the referrer. Four different services, all reacting independently to the same event. Adding a 5th service? Just subscribe — zero changes to the publisher.",
    howItWorks: [
      { title: "Publisher creates a topic", description: "A named topic is created (e.g., 'user-signups', 'order-placed'). Topics are the communication channels." },
      { title: "Subscribers subscribe to topics", description: "Services register interest in specific topics. Each subscriber gets its own copy of every message." },
      { title: "Publisher sends message", description: "When an event occurs, the publisher sends a message to the topic. It doesn't know or care who's listening." },
      { title: "Broker fans out message", description: "The message broker delivers the message to ALL active subscribers of that topic independently." },
      { title: "Each subscriber processes independently", description: "Each subscriber receives and processes the message at their own pace. One slow subscriber doesn't affect others." },
    ],
    deepDive: [
      { title: "Fan-Out: The Superpower of Pub/Sub", content: "Fan-out means one event triggers multiple independent reactions. Without pub/sub, you'd have the publisher directly calling each downstream service — tight coupling, and adding a new service means modifying the publisher. With pub/sub, the publisher simply emits 'OrderPlaced'. Currently subscribed: inventory, email, analytics. Next month, add fraud detection? Just subscribe — the publisher code doesn't change. This is the Open/Closed Principle in action — open for extension, closed for modification." },
      { title: "At-Least-Once Delivery and Idempotency", content: "Most pub/sub systems guarantee at-least-once delivery — if delivery fails, the message is retried. This means subscribers may receive the same message twice. Your handlers MUST be idempotent. Bad: emailService.send(welcomeEmail) — called twice = user gets 2 welcome emails. Good: if (!db.exists(sentEmails, userId)) { emailService.send(welcomeEmail); db.insert(sentEmails, userId); } — called twice = only 1 email sent. Always design handlers assuming they'll be called multiple times." },
      { title: "Pub/Sub vs Message Queues", content: "They solve different problems. Message Queue: one message, one consumer. Work distribution. 'Process this image.' If 5 workers are listening, only one gets the message. Pub/Sub: one message, all subscribers. Event notification. 'A user signed up.' All 5 services get the message. Some systems blur the line: Kafka uses consumer groups (pub/sub semantics between groups, queue semantics within a group). RabbitMQ supports both via different exchange types (fanout = pub/sub, direct = queue)." },
    ],
    whenToUse: [
      "When multiple systems need to react to the same event",
      "When you need to decouple event producers from consumers",
      "When building notification or broadcast systems",
      "When new consumers will be added over time",
    ],
    useCases: [
      "New user signup → send welcome email + create CRM record + track analytics",
      "Order placed → update inventory + notify warehouse + send receipt",
      "Real-time notifications and push alerts",
      "IoT sensor data distribution to multiple processors",
    ],
    tradeoffs: {
      pros: [
        "Extreme decoupling — publishers don't know about subscribers",
        "Easy to add new subscribers without modifying publishers",
        "Supports fan-out patterns efficiently",
        "Natural fit for event-driven architectures",
      ],
      cons: [
        "No guaranteed delivery order across subscribers",
        "Debugging event flows can be difficult",
        "Potential for message loss if subscribers are down",
        "Can lead to complex event choreography",
      ],
    },
    realWorldExamples: [
      { company: "Google Cloud Pub/Sub", description: "Provides global, scalable pub/sub messaging used by Spotify for real-time event processing." },
      { company: "Twitch", description: "Uses pub/sub to broadcast live chat messages, subscription events, and stream status changes to millions of viewers." },
    ],
    relatedConcepts: ["message-queues", "event-streaming"],
    keyTakeaway: "Pub/Sub is ideal for fan-out. When one event should trigger many independent reactions, pub/sub keeps your system extensible.",
  },

  // ═══════════════════════════════════════
  // NETWORKING
  // ═══════════════════════════════════════
  {
    id: "api-gateway",
    name: "API Gateway",
    categoryId: "networking",
    difficulty: "intermediate",
    definition:
      "An API Gateway acts as the single entry point for all client requests, handling authentication, rate limiting, routing, protocol translation, and response aggregation.",
    importance:
      "API Gateways simplify client-service communication by providing a unified interface and centralizing cross-cutting concerns.",
    story:
      "Imagine a massive corporate building with 50 different offices. Without a receptionist, every visitor would need to know the exact floor, room number, and access code for each office. Some offices speak English, others speak French, and some only accept visitors with special badges. An API gateway is the building's receptionist. Every visitor (client) goes to the front desk (gateway) first. The receptionist checks their ID (authentication), looks up where they need to go (routing), translates their request if needed (protocol translation), and even calls multiple offices to compile a combined response (aggregation). The beauty? When Office 23 moves from Floor 5 to Floor 8, only the receptionist's directory needs updating. No visitor has to change anything. When you add security cameras (monitoring), you add them at the front desk — one place, all coverage.",
    howItWorks: [
      { title: "Client sends request to gateway", description: "All API requests hit a single entry point instead of individual services. Gateway is the only public-facing endpoint." },
      { title: "Authentication & authorization", description: "Gateway validates API keys, JWT tokens, or OAuth credentials. Unauthorized requests are rejected before reaching any service." },
      { title: "Rate limiting applied", description: "Per-client rate limits are enforced. Excessive requests get 429 responses without wasting backend resources." },
      { title: "Request routed to service", description: "Based on the URL path, headers, or content, the gateway routes the request to the appropriate backend microservice." },
      { title: "Response transformation", description: "Gateway can modify responses — filtering fields, converting formats (XML to JSON), or aggregating from multiple services." },
    ],
    deepDive: [
      { title: "BFF Pattern (Backend for Frontend)", content: "Different clients need different data. A mobile app needs a compact response with only essential fields. A web dashboard needs rich, detailed data. A partner API needs a different format entirely. The BFF pattern creates separate API gateways (or gateway configurations) for each client type. Mobile BFF returns { name, avatar, unreadCount }. Web BFF returns { name, avatar, email, settings, notifications, activityLog }. Each BFF is optimized for its client, reducing over-fetching and under-fetching." },
      { title: "Request Aggregation", content: "A single user profile page might need data from 5 services: User Service, Post Service, Follower Service, Notification Service, Settings Service. Without a gateway, the mobile app makes 5 HTTP requests — slow on cellular networks. The gateway aggregates: one client request → gateway fans out to 5 services in parallel → merges results → returns one response. Latency drops from 5 sequential round trips to 1 round trip (with internal parallel calls)." },
      { title: "Gateway Anti-Patterns", content: "The gateway can become a monolithic bottleneck if you put too much business logic in it. It should handle cross-cutting concerns (auth, rate limiting, logging, routing) but NOT business logic (order validation, pricing calculations). Every microservice team shouldn't need to modify the gateway to deploy. Keep the gateway thin and fight the temptation to add 'just one more feature' to it." },
    ],
    whenToUse: [
      "When you have multiple backend microservices",
      "When different clients need different API formats",
      "When you need centralized auth, logging, and rate limiting",
      "When you want to aggregate responses from multiple services",
    ],
    useCases: [
      "Routing /users/* to User Service and /orders/* to Order Service",
      "Mobile BFF with optimized payloads",
      "Centralizing JWT validation and API key management",
      "Request/response transformation between protocols",
    ],
    tradeoffs: {
      pros: [
        "Simplifies client-side code with a single endpoint",
        "Centralizes cross-cutting concerns",
        "Enables protocol translation (REST to gRPC)",
        "Supports API versioning and canary deployments",
      ],
      cons: [
        "Can become a single point of failure",
        "Adds latency from additional network hop",
        "Complex configuration management",
        "Risk of becoming a monolithic bottleneck",
      ],
    },
    realWorldExamples: [
      { company: "Netflix", description: "Uses Zuul API Gateway to route billions of requests daily, handle authentication, and provide dynamic routing for its microservice fleet." },
      { company: "Kong", description: "Open-source API gateway used by Apple and Nasdaq for rate limiting, authentication, and traffic management." },
    ],
    relatedConcepts: ["load-balancing", "reverse-proxy", "rate-limiting", "microservices"],
    keyTakeaway: "An API Gateway is essential for microservice architectures. Just ensure it's scaled properly — it sees every single request.",
  },
  {
    id: "reverse-proxy",
    name: "Reverse Proxy",
    categoryId: "networking",
    difficulty: "beginner",
    definition:
      "A reverse proxy sits in front of web servers and forwards client requests to backend servers, handling SSL termination, compression, and caching.",
    importance:
      "Reverse proxies protect backend servers, improve performance through caching and compression, and enable SSL termination at the edge.",
    story:
      "Your backend server is like a chef in a restaurant kitchen. The chef is brilliant at cooking but terrible at dealing with customers. They don't want to handle payments, answer phone calls, or deal with complaints. So you hire a front-of-house manager (reverse proxy). The manager takes orders from customers, handles payments and complaints, and passes cooking requests to the chef. The customers never see the kitchen. The chef never sees the customers. The manager also does smart things: if 10 people order the same daily special, the manager might prepare it in advance (caching). They wrap takeout orders nicely (compression). They check IDs at the door (SSL/authentication). And if the restaurant grows, the manager can direct orders to multiple chefs in multiple kitchens (load balancing). Nginx and Caddy are the world's most popular 'restaurant managers.'",
    howItWorks: [
      { title: "Client connects to proxy", description: "The client (browser) connects to the reverse proxy's IP address. It doesn't know about any backend servers." },
      { title: "SSL termination", description: "The proxy handles TLS/SSL decryption. Backend servers receive plain HTTP, avoiding the CPU cost of encryption." },
      { title: "Request inspection", description: "The proxy reads the request — URL, headers, cookies — and decides which backend server should handle it." },
      { title: "Forward to backend", description: "The request is forwarded to the selected backend server over the internal network." },
      { title: "Response optimization", description: "The proxy receives the response, compresses it (gzip/brotli), adds caching headers, and sends it to the client." },
    ],
    deepDive: [
      { title: "Nginx as Reverse Proxy", content: "Nginx serves over 35% of all websites. A typical config: upstream backend { server 10.0.0.1:3000; server 10.0.0.2:3000; } → route /api/ to backend, serve /static/ directly from disk, enable gzip compression, and terminate SSL with Let's Encrypt certificates. All in ~30 lines of config. Nginx can handle 10,000+ concurrent connections on a single server using its event-driven, non-blocking architecture." },
      { title: "SSL Termination: Why It Matters", content: "SSL/TLS encryption is CPU-intensive. If each of your 10 backend servers handles its own SSL, that's 10 servers burning CPU on encryption. With SSL termination at the proxy, only the proxy handles encryption — backend servers communicate over plain HTTP on the internal network (which is secure by network isolation). This can reduce backend CPU usage by 15-25%. Modern proxies also handle certificate rotation, OCSP stapling, and HTTP/2 multiplexing automatically." },
      { title: "Forward Proxy vs Reverse Proxy", content: "Forward proxy: sits in front of clients, acts on behalf of clients. 'Hey proxy, fetch google.com for me.' Used for privacy (hiding client IP), filtering (blocking sites), and caching in corporate networks. Reverse proxy: sits in front of servers, acts on behalf of servers. Client doesn't know it exists. Used for load balancing, SSL termination, and protecting backend infrastructure. VPN ≈ Forward Proxy. CDN / Nginx ≈ Reverse Proxy." },
    ],
    whenToUse: [
      "When you need SSL/TLS termination at the edge",
      "When you want to cache static content closer to users",
      "When you need to hide internal server architecture",
      "When implementing A/B testing or blue-green deployments",
    ],
    useCases: [
      "Nginx serving static files and proxying API requests",
      "SSL termination at the proxy layer",
      "Compressing responses before sending to clients",
      "Canary deployments routing 5% traffic to new version",
    ],
    tradeoffs: {
      pros: [
        "Offloads SSL, compression, and caching from app servers",
        "Hides internal infrastructure from clients",
        "Enables advanced routing and traffic management",
        "Improves security as a centralized control point",
      ],
      cons: [
        "Single point of failure if not redundant",
        "Adds network hop latency",
        "Configuration complexity for advanced routing",
        "Can mask backend issues in debugging",
      ],
    },
    realWorldExamples: [
      { company: "Nginx", description: "Powers over 35% of the web as a reverse proxy, handling SSL termination, load balancing, and static content serving." },
      { company: "Cloudflare", description: "Acts as a reverse proxy for millions of websites, providing DDoS protection, SSL, caching, and a WAF." },
    ],
    relatedConcepts: ["load-balancing", "api-gateway", "cdn"],
    keyTakeaway: "Put a reverse proxy (Nginx, Caddy) in front of your application servers from day one. Easy win for security, performance, and flexibility.",
  },
  {
    id: "graphql-vs-rest",
    name: "GraphQL vs REST",
    categoryId: "networking",
    difficulty: "intermediate",
    definition:
      "REST uses fixed endpoints with predefined data structures. GraphQL provides a single endpoint where clients specify exactly what data they need.",
    importance:
      "Choosing the right API paradigm impacts developer experience, performance, and system complexity.",
    story:
      "REST is like a restaurant with a fixed menu. You order Dish #5 and get exactly what the chef decided goes in Dish #5 — even if you're allergic to the garnish (over-fetching). If you want ingredients from Dish #5 and Dish #12 combined, you order both dishes and pick out what you want (under-fetching, multiple requests). GraphQL is like a build-your-own-bowl restaurant. You walk up and say: 'I want rice, chicken, avocado, no beans, and extra cheese.' You get exactly what you asked for — nothing more, nothing less. One order, perfectly customized. GitHub switched from REST (v3) to GraphQL (v4) because their REST API was causing massive over-fetching. A mobile app listing repositories would receive huge JSON responses full of fields it didn't need (all contributors, all branches, etc.), wasting bandwidth and battery. With GraphQL, the app requests exactly: { name, description, starCount } — a 90% reduction in response size.",
    howItWorks: [
      { title: "REST: Multiple endpoints", description: "GET /users/123 returns user data. GET /users/123/posts returns posts. GET /posts/456/comments returns comments. Each endpoint returns a fixed shape." },
      { title: "GraphQL: Single endpoint", description: "POST /graphql with a query: { user(id: 123) { name, posts { title, comments { text } } } }. One request, exact data." },
      { title: "REST: Server decides response shape", description: "The server defines the response format. Clients get all fields whether they need them or not." },
      { title: "GraphQL: Client decides response shape", description: "The client's query specifies exactly which fields to return. Only requested data is serialized and sent." },
      { title: "GraphQL: Schema and type system", description: "A strongly-typed schema defines all available types, fields, and relationships. Self-documenting and introspectable." },
    ],
    deepDive: [
      { title: "The N+1 Problem in GraphQL", content: "A query fetching 50 users with their posts naively triggers: 1 query for users + 50 queries for each user's posts = 51 database queries. This is the N+1 problem—and it's the #1 performance pitfall in GraphQL. Solution: DataLoader. It batches and deduplicates: instead of 50 individual user look-ups, DataLoader collects all IDs and makes ONE query: SELECT * FROM posts WHERE user_id IN (1, 2, 3, ..., 50). 51 queries become 2. Every production GraphQL server must use DataLoader or equivalent." },
      { title: "When REST is Actually Better", content: "REST shines for: simple CRUD APIs with predictable data needs (95% of internal microservice APIs), HTTP caching (GET /users/123 is trivially cacheable; GraphQL POST requests are not), public APIs where simplicity matters (Stripe, Twilio), and file uploads. REST's constraints are features: statelessness, cacheability, and uniform interface make it the bedrock of the internet. Don't use GraphQL just because it's trendy." },
      { title: "The Hybrid Approach", content: "Many companies use both. Shopify: GraphQL for the Storefront API (flexible frontend queries) + REST for the Admin API (predictable server-to-server calls). GitHub: REST v3 for simple operations, GraphQL v4 for complex, nested queries. The pattern: GraphQL for client-facing APIs where flexibility matters, REST for internal service-to-service communication where simplicity and caching matter." },
    ],
    whenToUse: [
      "REST: For simple CRUD operations with predictable data needs",
      "REST: When HTTP caching is important",
      "GraphQL: When clients need flexible, nested data queries",
      "GraphQL: When different clients need different data shapes",
    ],
    useCases: [
      "REST: Public APIs with well-defined resources",
      "REST: Microservice-to-microservice communication",
      "GraphQL: Mobile apps needing optimized data payloads",
      "GraphQL: Dashboard UIs aggregating data from many sources",
    ],
    tradeoffs: {
      pros: [
        "REST: Simple, well-understood, excellent HTTP caching",
        "REST: Stateless, easy to scale and debug",
        "GraphQL: Eliminates over-fetching and under-fetching",
        "GraphQL: Self-documenting schema and strong typing",
      ],
      cons: [
        "REST: Over-fetching and under-fetching problems",
        "REST: Multiple round trips for nested data",
        "GraphQL: Complex server implementation",
        "GraphQL: N+1 query problem and no built-in caching",
      ],
    },
    realWorldExamples: [
      { company: "GitHub", description: "Adopted GraphQL (v4 API) after REST (v3) to let clients fetch exactly the data they need in one request." },
      { company: "Shopify", description: "Uses GraphQL for its Storefront API, allowing merchants to build custom frontends with precise data fetching." },
    ],
    relatedConcepts: ["api-gateway", "reverse-proxy"],
    keyTakeaway: "REST is the default choice. Move to GraphQL when you have complex, nested data requirements or multiple client types.",
  },
  {
    id: "service-discovery",
    name: "Service Discovery",
    categoryId: "networking",
    difficulty: "intermediate",
    definition:
      "Service discovery automates detection of service instances on a network. Services register themselves and discover others through a registry.",
    importance:
      "In dynamic environments where services scale up/down and IPs change constantly, hardcoding service locations is impossible.",
    story:
      "In the old days, your app talked to the database at 192.168.1.50:5432. You hardcoded it in a config file. Life was simple. Then you moved to the cloud. Your database IP changed every deployment. Then you added microservices — 20 services, each with 5 instances, and their IPs change every time they auto-scale. That's 100 moving targets. Hardcoding addresses is like trying to call friends who change phone numbers every hour. You need a phone book that updates in real-time. That's service discovery. When a new 'User Service' instance starts, it calls the registry: 'Hey, I'm User Service, I'm at 10.0.3.47:8080, I'm healthy.' When 'Order Service' needs to call 'User Service,' it asks the registry: 'Where is User Service right now?' The registry responds: '10.0.3.47:8080, 10.0.3.48:8080, 10.0.3.49:8080 — all healthy.' Kubernetes does this automatically with DNS — service-name.namespace.svc.cluster.local always resolves to healthy pods.",
    howItWorks: [
      { title: "Service starts up", description: "A new service instance boots, binds to a port, and registers itself with the service registry (name, address, port, health endpoint)." },
      { title: "Health checks begin", description: "The registry periodically pings the service's health endpoint. Unhealthy instances are removed from the registry." },
      { title: "Client queries registry", description: "When Service A needs to call Service B, it queries the registry for Service B's current healthy instances." },
      { title: "Client-side or server-side LB", description: "Client-side: the caller picks from the list of instances. Server-side: a load balancer routes to a healthy instance." },
      { title: "Service shuts down", description: "On graceful shutdown, the service deregisters itself. On crash, the health check eventually removes it." },
    ],
    deepDive: [
      { title: "DNS-Based Discovery (Kubernetes)", content: "Kubernetes provides built-in discovery through DNS. Every Service object gets a DNS record: my-service.my-namespace.svc.cluster.local. When pods come and go, Kubernetes updates the DNS records automatically. No external registry needed. This is why Kubernetes has become the de facto platform for microservices — it solves service discovery, load balancing, and health checking out of the box." },
      { title: "Consul and Service Mesh", content: "HashiCorp Consul offers service discovery with additional superpowers: distributed health checking (any Consul node can check service health), key-value config storage, and service mesh capabilities (mTLS between services, traffic encryption). In a service mesh architecture (Istio, Consul Connect), a sidecar proxy handles discovery, load balancing, encryption, and observability transparently — application code doesn't need to change at all." },
      { title: "Challenges: Stale Registrations", content: "The biggest pitfall: a service crashes without deregistering. The registry still thinks it's alive. Other services try calling it and get timeouts. Solutions: aggressive health checking (every 5-10 seconds), TTL-based registration (entries expire unless refreshed), and circuit breakers in callers (stop trying after N failures). Always set health check intervals shorter than your timeout thresholds." },
    ],
    whenToUse: [
      "In any microservices architecture",
      "When services auto-scale and instances change dynamically",
      "When running on container orchestration platforms",
      "When services need to find each other across environments",
    ],
    useCases: [
      "Kubernetes DNS-based service discovery",
      "Consul service mesh with health-check-aware routing",
      "Netflix Eureka for dynamic microservice registration",
      "DNS-based discovery for multi-region services",
    ],
    tradeoffs: {
      pros: [
        "Enables dynamic, elastic infrastructure",
        "Eliminates hardcoded configurations",
        "Supports health-check-aware routing",
        "Enables blue-green and canary deployments",
      ],
      cons: [
        "Registry can become a single point of failure",
        "Stale registrations if health checks are misconfigured",
        "Network overhead for constant registration/lookup",
        "Added complexity in development and testing",
      ],
    },
    realWorldExamples: [
      { company: "Kubernetes", description: "Provides built-in service discovery through DNS, making service-to-service communication automatic." },
      { company: "HashiCorp Consul", description: "Offers service discovery with built-in health checking, used by Stripe and DigitalOcean for service mesh networking." },
    ],
    relatedConcepts: ["microservices", "load-balancing", "api-gateway", "health-checks"],
    keyTakeaway: "Let containers and cloud platforms handle service discovery. Don't reinvent it — use Kubernetes DNS, Consul, or your cloud provider's service.",
  },

  // ═══════════════════════════════════════
  // SECURITY
  // ═══════════════════════════════════════
  {
    id: "oauth-jwt",
    name: "OAuth 2.0 & JWT",
    categoryId: "security",
    difficulty: "intermediate",
    definition:
      "OAuth 2.0 is an authorization framework for third-party app access. JWT is a compact, self-contained token format for transmitting claims between parties.",
    importance:
      "OAuth and JWT are the standard for modern authentication. Understanding them is essential for building secure APIs and enabling SSO.",
    story:
      "You want to sign into a new photo editing app with your Google account. Here's what happens behind the scenes. The app says: 'I need to know who you are, but I should NEVER see your Google password.' So instead, it redirects you to Google: 'Hey Google, this app wants to read this user's name and email. Is that OK?' You see Google's login page (not the app's). You enter YOUR Google password on GOOGLE'S page. Google verifies you, then asks: 'This app wants your name and email. Allow?' You click Allow. Google gives the app a token — a signed, time-limited pass that says 'This user is john@gmail.com and they allowed access to name and email.' The app never saw your password. If you want to revoke access later, you go to Google settings and remove the app. The token becomes worthless. This is OAuth 2.0. The token itself is usually a JWT — a base64-encoded JSON object with a cryptographic signature so nobody can tamper with it.",
    howItWorks: [
      { title: "User clicks 'Sign in with Google'", description: "The app redirects the user to Google's authorization server with requested scopes (email, profile)." },
      { title: "User authenticates with Google", description: "The user enters their Google credentials directly on Google's page. The app never sees the password." },
      { title: "User consents to permissions", description: "Google shows which data/actions the app is requesting. The user can accept or deny." },
      { title: "Google returns auth code", description: "Google redirects back to the app with a short-lived authorization code in the URL." },
      { title: "App exchanges code for tokens", description: "The app's backend sends the auth code + client secret to Google. Google returns an access token (and optionally a refresh token)." },
      { title: "App uses token for API calls", description: "The app includes the access token in API requests. When it expires, the refresh token gets a new one without re-prompting the user." },
    ],
    deepDive: [
      { title: "JWT Structure: Header.Payload.Signature", content: "A JWT has 3 parts separated by dots. Header: {\"alg\": \"RS256\", \"typ\": \"JWT\"} — the signing algorithm. Payload: {\"sub\": \"user123\", \"name\": \"John\", \"exp\": 1700000000, \"roles\": [\"admin\"]} — the claims (who, what, when). Signature: HMAC or RSA signature of header+payload using a secret key. Anyone can decode the header and payload (it's just base64, not encryption). But nobody can modify them without invalidating the signature. This is why you should NEVER put sensitive data (passwords, credit cards) in a JWT — it's signed, not encrypted." },
      { title: "The JWT Revocation Problem", content: "JWTs are stateless — the server doesn't store them. This is their strength (no session store needed) and their weakness (you can't revoke them). If a user logs out or you need to block a compromised token, you can't just delete it — it's self-contained and valid until it expires. Solutions: short expiration times (15 minutes) with refresh tokens (long-lived, stored in DB, revocable). On logout, revoke the refresh token. The access token will expire naturally in 15 minutes. For immediate revocation, maintain a small blocklist of revoked tokens in Redis — checked on each request." },
      { title: "OAuth2 Flow Types", content: "Authorization Code Flow: Most secure. For server-side apps. User authenticates, server gets tokens. PKCE Flow: For single-page apps and mobile apps (no client secret to hide). Uses a code verifier/challenge. Client Credentials Flow: For service-to-service communication. No user involved — the service authenticates itself. Implicit Flow: DEPRECATED. Tokens in URL fragment — security risk. Never use this. Always use Authorization Code + PKCE for any client-side application." },
    ],
    whenToUse: [
      "When implementing 'Sign in with Google/Facebook' functionality",
      "When building APIs that third-party apps consume",
      "When you need stateless authentication across microservices",
      "When implementing Single Sign-On (SSO)",
    ],
    useCases: [
      "Social login integration",
      "API authentication for mobile and SPA clients",
      "Microservice-to-microservice authorization",
      "Delegated access (app accessing user's Google Drive)",
    ],
    tradeoffs: {
      pros: [
        "Industry standard with massive library support",
        "JWTs are stateless — no server-side session storage needed",
        "Fine-grained scopes control access precisely",
        "Enables secure third-party integrations",
      ],
      cons: [
        "JWT revocation is difficult (they're stateless)",
        "Token size can be large with many claims",
        "Complex specification with multiple flows",
        "Security vulnerabilities if implemented incorrectly",
      ],
    },
    realWorldExamples: [
      { company: "Auth0", description: "Provides OAuth 2.0 authentication as a service, handling JWT issuance and validation for thousands of applications." },
      { company: "Google", description: "Uses OAuth 2.0 for all API access, allowing apps to request specific scopes like read-only Gmail or Google Drive access." },
    ],
    relatedConcepts: ["api-gateway", "rate-limiting", "encryption"],
    keyTakeaway: "Use short-lived JWTs with refresh tokens. Never store sensitive data in JWT payloads — they're base64 encoded, not encrypted.",
  },
  {
    id: "encryption",
    name: "Encryption (At Rest & In Transit)",
    categoryId: "security",
    difficulty: "intermediate",
    definition:
      "Encryption at rest protects stored data on disk (AES-256). Encryption in transit protects data moving between systems using TLS/SSL.",
    importance:
      "Encryption is mandatory for compliance (GDPR, HIPAA, PCI-DSS) and essential for protecting user data. Without it, breaches expose plaintext information.",
    story:
      "Sending data over the internet without encryption is like sending a postcard. Every mail carrier, sorting facility, and nosy neighbor can read it. TLS encryption turns that postcard into a sealed, tamper-evident envelope. Even if someone intercepts it, they see only gibberish. At rest encryption is like storing your valuables in a safe instead of on the kitchen table. If someone breaks into your house (data breach), they find a locked safe they can't open — not your passport, credit cards, and jewelry laid out neatly. In 2013, Adobe was breached and 153 million passwords were exposed. They were encrypted but with a terrible algorithm (3DES-ECB) that allowed patterns to be detected. In 2012, LinkedIn was breached — 6.5 million passwords leaked as unsalted SHA-1 hashes, cracked within hours. Encryption isn't optional, and the algorithm matters as much as the decision to encrypt.",
    howItWorks: [
      { title: "TLS Handshake (In Transit)", description: "Client and server negotiate encryption. Server presents its SSL certificate. Client verifies it against trusted Certificate Authorities." },
      { title: "Key Exchange", description: "Using asymmetric encryption (RSA/ECDH), client and server agree on a shared symmetric key without ever sending it over the network." },
      { title: "Symmetric Encryption Begins", description: "All subsequent data is encrypted with the shared key using AES-256-GCM. Fast, secure, and tamper-evident." },
      { title: "At Rest: Data Written to Disk", description: "Before writing to disk, data is encrypted with a data encryption key (DEK). The DEK is itself encrypted by a master key (key encryption key)." },
      { title: "Key Management (KMS)", description: "Encryption keys are stored and managed separately from data. AWS KMS, GCP KMS, or HashiCorp Vault handle key rotation and access control." },
    ],
    deepDive: [
      { title: "TLS 1.3: The Modern Standard", content: "TLS 1.3 (2018) made major improvements over TLS 1.2: 1 round trip handshake instead of 2 (faster client-hello), removed insecure algorithms (RC4, SHA-1, RSA key exchange), added 0-RTT resumption (instant reconnection for returning clients), and simplified the cipher suite negotiation. If you're still on TLS 1.2, upgrade. If you're on TLS 1.0/1.1, you're violating PCI-DSS compliance as of 2020." },
      { title: "Envelope Encryption", content: "Don't encrypt everything with one master key. If that key leaks, everything is exposed. Instead use envelope encryption: each piece of data gets its own Data Encryption Key (DEK). The DEK is encrypted by a Key Encryption Key (KEK) stored in a KMS. To decrypt: ask KMS to decrypt the DEK → use DEK to decrypt the data. This way, the master key never leaves the KMS hardware. If one DEK is compromised, only that one piece of data is at risk, not everything." },
      { title: "Hashing vs Encryption", content: "Encryption is reversible (decrypt with key). Hashing is one-way (no 'unhashing'). Passwords should be HASHED, not encrypted. If you encrypt passwords, anyone with the key can read all passwords. With hashing (bcrypt, argon2), even you can't recover the original password. To verify login: hash the input and compare with stored hash. Always use slow, salted hashing algorithms: bcrypt (cost factor 12+), argon2id (memory-hard, resistant to GPU attacks). NEVER use MD5 or SHA-256 for passwords — they're too fast (GPUs can test billions per second)." },
    ],
    whenToUse: [
      "Always — encryption should be the default, not an afterthought",
      "When storing PII, financial data, or health records",
      "When data traverses public or untrusted networks",
      "When regulatory compliance requires it",
    ],
    useCases: [
      "TLS for all API and web traffic (HTTPS)",
      "Database encryption at rest for user data",
      "Encrypting backups and data exports",
      "End-to-end encryption for messaging apps",
    ],
    tradeoffs: {
      pros: [
        "Protects data confidentiality even if systems are breached",
        "Required for regulatory compliance",
        "TLS is nearly zero-overhead with modern hardware",
        "Key rotation enables forward secrecy",
      ],
      cons: [
        "Key management is complex and critical",
        "At-rest encryption adds slight performance overhead",
        "Lost encryption keys means permanently lost data",
        "Makes debugging and monitoring more complex",
      ],
    },
    realWorldExamples: [
      { company: "WhatsApp", description: "Implements end-to-end encryption using the Signal Protocol, ensuring only sender and receiver can read messages." },
      { company: "AWS KMS", description: "Provides centralized key management for encrypting data across all AWS services, with automatic key rotation." },
    ],
    relatedConcepts: ["oauth-jwt", "api-gateway"],
    keyTakeaway: "Encrypt everything, everywhere, always. Use TLS 1.3 for transit, AES-256 for storage, and a dedicated KMS for key management.",
  },

  // ═══════════════════════════════════════
  // ARCHITECTURE PATTERNS
  // ═══════════════════════════════════════
  {
    id: "microservices",
    name: "Microservices Architecture",
    categoryId: "architecture",
    difficulty: "intermediate",
    definition:
      "Microservices decomposes an application into small, independently deployable services, each owning its data and business logic.",
    importance:
      "Microservices enable teams to develop, deploy, and scale services independently — essential for large engineering teams.",
    story:
      "In 2001, Amazon.com was a monolith. Every feature — search, recommendations, checkout, inventory — lived in one massive codebase. Deploying a change to search risked breaking checkout. A bug in recommendations could take down the entire site. Engineering teams stepped on each other's toes constantly. Then Jeff Bezos sent the famous 'API Mandate' memo: every team must expose their functionality through APIs. No team may directly access another team's data store. All communication happens through documented interfaces. This forced decomposition was painful but transformative. Each team became a mini-startup, owning their service end-to-end. The Search team could deploy independently. The Recommendations team could use whatever database they wanted. If one service crashed, the rest kept running. Amazon went from shipping code every few months to thousands of deployments per day. But — and this is crucial — Amazon had 10,000+ engineers to manage this complexity. Netflix, with 2,000+ engineers, has 1,000+ microservices. Shopify, with similar scale, chose a modular monolith instead. The right choice depends on your team size and maturity.",
    howItWorks: [
      { title: "Identify bounded contexts", description: "Use Domain-Driven Design to identify natural service boundaries: User, Order, Payment, Notification, etc." },
      { title: "Each service owns its data", description: "Each microservice has its own database. No sharing databases between services —  this is the hardest rule to follow." },
      { title: "Services communicate via APIs", description: "Synchronous (REST/gRPC) for request-response. Asynchronous (events/queues) for fire-and-forget or fan-out." },
      { title: "Independent deployment", description: "Each service has its own CI/CD pipeline, its own repo (or monorepo with separate builds), and deploys independently." },
      { title: "Observe everything", description: "Distributed tracing, centralized logging, and per-service metrics are mandatory. Without observability, debugging is impossible." },
    ],
    deepDive: [
      { title: "The Database-Per-Service Rule", content: "This is the most debated and most important rule of microservices. If Order Service and User Service share a database, a schema change in one breaks the other. Their deployments become coupled. They scale together. You've just built a 'distributed monolith' — the worst of both worlds. Each service gets its own database (and can choose different database types). Order Service uses PostgreSQL. User Service uses MongoDB. Search Service uses Elasticsearch. Data that needs to be shared is exposed through APIs or replicated through events." },
      { title: "The Distributed Monolith Anti-Pattern", content: "Many teams 'adopt microservices' but build something worse: tightly coupled services that must be deployed together, share databases, and fail as a unit. Signs you have a distributed monolith: (1) You can't deploy one service without deploying others. (2) A change in Service A requires changes in Services B and C. (3) Services share a database or common library that changes frequently. (4) You need to coordinate releases across teams. The fix: enforce API contracts, separate databases, use event-driven communication, and invest in proper service boundaries." },
      { title: "When NOT to Use Microservices", content: "Startups with < 10 engineers: You'll spend more time on infrastructure than building product. The coordination overhead isn't worth it. New products with unclear boundaries: You don't know your domain well enough to draw the right service boundaries. Wrong boundaries are worse than no boundaries. Teams without DevOps maturity: Microservices require CI/CD, container orchestration, distributed tracing, and on-call rotations for each service. Start with a well-structured monolith. Extract services when pain points emerge and you have the team to support them." },
    ],
    whenToUse: [
      "When your team is large enough to own separate services (10+ engineers)",
      "When different parts of the system have different scaling needs",
      "When you need independent deployment cycles",
      "When different components benefit from different tech stacks",
    ],
    useCases: [
      "E-commerce: separate Cart, Payment, Inventory, User services",
      "Streaming: separate Encoding, Recommendation, Playback services",
      "SaaS: separate Auth, Billing, Core Product, Analytics services",
      "Fintech: separate Account, Transaction, Fraud Detection services",
    ],
    tradeoffs: {
      pros: [
        "Independent deployment and scaling per service",
        "Team autonomy — each team owns their service",
        "Technology flexibility per service",
        "Fault isolation — one service failure doesn't crash everything",
      ],
      cons: [
        "Distributed system complexity (networking, consistency)",
        "Operational overhead (monitoring, tracing, deployment)",
        "Data consistency across services is challenging",
        "Integration testing is significantly harder",
      ],
    },
    realWorldExamples: [
      { company: "Netflix", description: "Runs 1,000+ microservices, each independently deployed and scaled. Their migration from monolith took 7+ years." },
      { company: "Amazon", description: "Teams follow the 'two-pizza team' rule, each owning a microservice. This powers the entire e-commerce and cloud platform." },
    ],
    relatedConcepts: ["api-gateway", "event-driven-architecture", "circuit-breaker", "service-discovery"],
    keyTakeaway: "Don't start with microservices. Start with a well-structured monolith and extract services when the team and complexity demand it.",
  },
  {
    id: "event-driven-architecture",
    name: "Event-Driven Architecture",
    categoryId: "architecture",
    difficulty: "advanced",
    definition:
      "Event-Driven Architecture uses events as the primary communication mechanism. Services emit events on state changes; others react asynchronously.",
    importance:
      "EDA enables highly decoupled, scalable, and responsive systems — the pattern behind real-time features and complex business workflows.",
    story:
      "In a traditional (imperative) architecture, the Order Service is a control freak. When an order is placed, it personally calls Inventory Service: 'Reduce stock by 1.' Then calls Email Service: 'Send confirmation.' Then calls Analytics Service: 'Track conversion.' Then calls Loyalty Service: 'Award 50 points.' If any service is down, the order fails. If you add a Fraud Detection service, you must modify Order Service. The order processing takes as long as all these calls combined. In an event-driven architecture, the Order Service just announces: 'Hey everyone, OrderPlaced happened!' Then walks away. Inventory, Email, Analytics, Loyalty — they're all listening. They each react independently, at their own pace. If Email Service is down, it processes the event when it recovers. If you add Fraud Detection, it just subscribes — Order Service doesn't change. The order completes in milliseconds because it's not waiting for anyone. The shift from 'command' (do this) to 'event' (this happened) fundamentally changes how systems are built.",
    howItWorks: [
      { title: "Event occurs", description: "Something meaningful happens in the system: user signs up, order placed, payment received, item shipped." },
      { title: "Producer emits event", description: "The service where the event originated publishes it to an event bus/broker with all relevant data." },
      { title: "Event persisted", description: "The event is durably stored in the broker (Kafka topic, SQS queue). It won't be lost even if consumers are temporarily down." },
      { title: "Consumers react independently", description: "Each subscribed service receives the event and processes it based on its own business logic." },
      { title: "System state evolves", description: "Multiple independent state changes happen across the system — inventory updated, email sent, analytics recorded." },
    ],
    deepDive: [
      { title: "Commands vs Events", content: "A command is imperative: 'Send an email to user X.' It implies a specific recipient and expected action. An event is declarative: 'User X signed up.' It states what happened, letting consumers decide what to do about it. Commands create coupling (caller knows about callee). Events create decoupling (emitter doesn't know about consumers). Design principle: within a service, use commands. Between services, use events." },
      { title: "Event Sourcing", content: "Instead of storing current state (balance = $500), store the events that produced it (deposited $1000, withdrew $300, withdrew $200). Current state is derived by replaying events. Benefits: complete audit trail (every change is recorded), time travel (see state at any point in history), easy debugging (reproduce exactly what happened), multiple read models (compute different views from same events). Drawbacks: eventual consistency, higher storage, complex queries on current state. Event sourcing works brilliantly for financial systems, booking systems, and collaborative editing." },
      { title: "Choreography vs Orchestration", content: "Choreography: each service knows what to do when it receives an event. Like a dance where each dancer knows the choreography — no director needed. Simple but hard to understand complex flows. Orchestration: a central coordinator (saga orchestrator) tells each service what to do step by step. Like a conductor directing an orchestra. Easier to understand and debug but creates a central point of coupling. For simple flows (3-4 steps): use choreography. For complex flows (10+ steps with compensations): use orchestration." },
    ],
    whenToUse: [
      "When building real-time features (notifications, live updates)",
      "When multiple services need to react to the same business event",
      "When you need audit trails or event sourcing",
      "When services should be loosely coupled and independently deployable",
    ],
    useCases: [
      "Real-time order tracking and status updates",
      "Event sourcing for financial transaction history",
      "CQRS pattern separating reads and writes",
      "IoT data processing pipelines",
    ],
    tradeoffs: {
      pros: [
        "Extremely loose coupling between services",
        "Natural fit for real-time and reactive systems",
        "Easy to add new event consumers without modifying producers",
        "Built-in audit trail when events are persisted",
      ],
      cons: [
        "Complex debugging — tracing events across services is hard",
        "Eventual consistency requires careful handling",
        "Event schema evolution needs careful versioning",
        "Can lead to complex choreography that's hard to understand",
      ],
    },
    realWorldExamples: [
      { company: "Uber", description: "Uses event-driven architecture for trip lifecycle: trip events trigger driver matching, pricing, ETA updates, and billing." },
      { company: "Stripe", description: "Processes payment events asynchronously, using webhooks to notify merchants of charge successes, failures, and disputes." },
    ],
    relatedConcepts: ["pub-sub", "event-streaming", "microservices", "message-queues"],
    keyTakeaway: "EDA excels at decoupling. If you find yourself thinking 'when X happens, Y and Z should also happen,' you need events.",
  },
  {
    id: "monolith-vs-microservices",
    name: "Monolith vs Microservices",
    categoryId: "architecture",
    difficulty: "beginner",
    definition:
      "A monolith builds the entire application as a single deployable unit. Microservices decompose it into independently deployable services.",
    importance:
      "This is the first and most consequential architectural decision. The wrong choice slows your team for years.",
    story:
      "Two startups launch the same day. Startup A reads all the tech blogs and builds microservices from day one: 12 services, Kubernetes, service mesh, event bus. They spend 6 months on infrastructure before writing any business logic. They hire 2 DevOps engineers just to keep the lights on. By month 12, they have a decent product but burned through half their runway on infrastructure. Startup B builds a well-structured Rails monolith. One codebase, one database, one deployment. They ship their MVP in 3 months. By month 12, they have product-market fit, paying customers, and yes — a growing monolith. When their monolith starts to hurt (deploy times, team conflicts), they extract the heaviest part into a separate service. Then another, and another. This evolutionary approach is exactly what Shopify did — and they handle billions of dollars in GMV with a modular monolith to this day. The 'start with microservices' approach has killed more startups than monolith-induced tech debt ever will.",
    howItWorks: [
      { title: "Monolith: Single codebase", description: "All features live in one repository, compiled into one artifact, deployed as one unit. Simple to develop, test, and deploy." },
      { title: "Monolith: Shared database", description: "All modules access the same database. JOINs are easy. Transactions span any tables. Data consistency is trivial." },
      { title: "Monolith: Scale by cloning", description: "To handle more traffic, run more copies of the entire application behind a load balancer." },
      { title: "Break point: When it hurts", description: "Team grows to 20+ engineers. Deploy takes 45 minutes. A change in module A breaks module B. This is when you consider splitting." },
      { title: "Extract services gradually", description: "Identify the most painful module. Build it as a separate service. Repeat. This is the 'Strangler Fig' pattern." },
    ],
    deepDive: [
      { title: "The Modular Monolith: Best of Both Worlds", content: "A modular monolith is a single deployable application with strict internal boundaries. Each module has its own directory, its own database schema, and communicates with others through internal APIs — no direct database access across modules. If you need to extract a module later, the boundaries are already drawn. You just move the module to its own deployment. Shopify uses this approach. They enforce module boundaries with automated tests that fail if one module imports from another's internals. Benefits of a monolith (simple deployment, easy debugging) with the future-proofing of microservices." },
      { title: "The Strangler Fig Pattern", content: "Named after a vine that grows around a tree until the tree dies. Migrate from monolith to microservices incrementally: (1) Build the new service alongside the monolith. (2) Route specific requests to the new service (via API gateway). (3) Gradually move more functionality. (4) Eventually, the monolith withers away. Each step is low-risk — you can always route traffic back. Amazon, Netflix, and Twitter all used this pattern. A full rewrite ('Big Bang Migration') almost always fails." },
      { title: "Decision Framework", content: "Choose monolith if: team < 10 engineers, domain boundaries are unclear, you're building an MVP, or you need to move fast. Choose microservices if: team > 50 engineers, clear domain boundaries, different parts need different scaling, or you need independent deployments. Choose modular monolith if: team is 10-50 engineers, you want future-flexibility, or you're not sure yet (the safest default). The key insight: the cost of wrong service boundaries in microservices is far higher than the cost of a monolith that's 'too big.' You can always split later; merging is much harder." },
    ],
    whenToUse: [
      "Monolith: Small teams, new products, MVPs",
      "Monolith: When domain boundaries are unclear",
      "Microservices: Large teams, mature products, clear boundaries",
      "Microservices: When different parts need independent scaling",
    ],
    useCases: [
      "Monolith: Early-stage startups, prototypes, internal tools",
      "Monolith: Applications with tightly coupled domain logic",
      "Microservices: Large-scale platforms (Netflix, Uber, Amazon)",
      "Modular monolith: Best of both worlds for medium-sized teams",
    ],
    tradeoffs: {
      pros: [
        "Monolith: Simple to develop, test, deploy, and debug",
        "Monolith: No distributed system complexity",
        "Microservices: Independent scaling and deployment",
        "Microservices: Team autonomy and technology flexibility",
      ],
      cons: [
        "Monolith: Can become a 'big ball of mud' over time",
        "Monolith: Single point of failure, scaling limitations",
        "Microservices: Significant operational complexity",
        "Microservices: Distributed system challenges",
      ],
    },
    realWorldExamples: [
      { company: "Shopify", description: "Chose to stay as a modular monolith on Ruby on Rails, actively investing in making their monolith work at massive scale." },
      { company: "Amazon", description: "Migrated from monolith to microservices via the Bezos API mandate, enabling AWS to be born from internal services." },
    ],
    relatedConcepts: ["microservices", "event-driven-architecture"],
    keyTakeaway: "Start with a monolith. Extract microservices only when you have clear domain boundaries and the team size to support them.",
  },

  // ═══════════════════════════════════════
  // RELIABILITY
  // ═══════════════════════════════════════
  {
    id: "circuit-breaker",
    name: "Circuit Breaker Pattern",
    categoryId: "reliability",
    difficulty: "intermediate",
    definition:
      "The circuit breaker prevents cascading failures by 'tripping' when failure thresholds are reached. Once open, requests fail fast instead of waiting.",
    importance:
      "Without circuit breakers, one failing service can cascade failures across your entire system through resource exhaustion.",
    story:
      "Your e-commerce site has a Recommendation Service that suggests 'You might also like...' products. One day, the ML model behind it starts timing out — taking 30 seconds instead of 100ms. Every product page waits 30 seconds for recommendations before showing anything. Users see blank pages. But it gets worse. Your 200 web server threads are now all blocked, waiting for the Recommendation Service. No threads are available to serve ANY requests — even the homepage, search, and checkout. The Recommendation Service (a nice-to-have feature) has just taken down your entire site. A circuit breaker prevents this. After 5 failed calls to Recommendation Service, the breaker 'trips open.' Now all calls to Recommendation Service immediately return a fallback response ('Popular Products') in 1ms instead of waiting 30 seconds. The main site keeps running perfectly. Every 30 seconds, the breaker allows one test request through to check if Recommendation Service has recovered. When it has, the breaker 'closes' and normal traffic resumes.",
    howItWorks: [
      { title: "Closed state (normal)", description: "All requests pass through to the downstream service. The breaker monitors failure rate (errors / total requests)." },
      { title: "Failure threshold reached", description: "If failure rate exceeds threshold (e.g., 50% failures in 10 seconds), the breaker transitions to OPEN state." },
      { title: "Open state (fast-fail)", description: "All requests are immediately rejected with a fallback response. No calls reach the downstream service. This protects both systems." },
      { title: "Half-open state (testing)", description: "After a cooldown period (30 seconds), the breaker allows ONE test request through to check if the downstream service recovered." },
      { title: "Recovery", description: "If the test request succeeds, the breaker closes (normal operation resumes). If it fails, the breaker stays open for another cooldown period." },
    ],
    deepDive: [
      { title: "Fallback Strategies", content: "When the circuit is open, what do you return? Default values: Show 'Popular Products' instead of personalized recommendations. Cached data: Return the last successful response (even if slightly stale). Degraded experience: Show the page without the failing section. Queue for later: Accept the request but process it when the service recovers. The fallback should provide a reasonable user experience. A blank page or error message is NOT a fallback." },
      { title: "Bulkhead Pattern (Complementary)", content: "Circuit breakers prevent cascading failures from one service. Bulkheads prevent one service's failures from consuming all your resources. Named after ship compartments that prevent the entire ship from flooding if one compartment breaches. Implementation: give each downstream service its own thread pool. Recommendation Service gets 20 threads. Payment Service gets 50 threads. If Recommendation Service blocks all 20 threads, the remaining 50 for Payment are unaffected. Without bulkheads, all 200 threads could be consumed by one slow service." },
      { title: "Implementation in Practice", content: "Netflix's Hystrix (now in maintenance) pioneered circuit breakers at scale. Modern alternatives: Resilience4j (Java), Polly (.NET), opossum (Node.js). Key configuration parameters: failureRateThreshold (50%), slowCallDurationThreshold (2s), slidingWindowSize (10 calls), waitDurationInOpenState (30s), permittedNumberOfCallsInHalfOpenState (3). Start with conservative settings and tune based on real traffic patterns. Monitor circuit state transitions — frequent tripping indicates a systemic problem, not just transient failures." },
    ],
    whenToUse: [
      "When calling external services or APIs that may be unreliable",
      "When a downstream failure should not cascade upstream",
      "When you need fast failure instead of slow timeouts",
      "In any microservices architecture",
    ],
    useCases: [
      "Payment service calling external payment gateway",
      "Frontend calling recommendation service (fallback to popular items)",
      "Service calling a slow third-party API",
      "Database connection pools under high load",
    ],
    tradeoffs: {
      pros: [
        "Prevents cascading failures across services",
        "Provides fast failure instead of slow timeouts",
        "Gives failing services time to recover",
        "Enables graceful degradation with fallback responses",
      ],
      cons: [
        "Needs careful threshold tuning",
        "Can mask the root cause of failures",
        "Half-open state needs thoughtful implementation",
        "Adds complexity to service communication code",
      ],
    },
    realWorldExamples: [
      { company: "Netflix", description: "Created Hystrix to prevent failures in their 1,000+ microservices from taking down the entire streaming platform." },
      { company: "Resilience4j", description: "Modern circuit breaker library for Java, used by Airbnb and Uber for fault-tolerant microservice communication." },
    ],
    relatedConcepts: ["health-checks", "microservices", "rate-limiting"],
    keyTakeaway: "Every external call should have a circuit breaker. The question isn't 'will this service fail?' — it's 'when it fails, what happens?'",
  },
  {
    id: "health-checks",
    name: "Health Checks & Monitoring",
    categoryId: "reliability",
    difficulty: "beginner",
    definition:
      "Health checks report service operational status. Monitoring collects metrics, alerting, logging, and distributed tracing.",
    importance:
      "You can't fix what you can't see. Health checks and monitoring are the eyes and ears of production.",
    story:
      "At 3 AM, your pager goes off: 'Website Down.' You SSH into the server. Is it the app? The database? The network? Memory? Disk? CPU? Without monitoring, you're a doctor trying to diagnose a patient without any vital signs. You start guessing. An hour later, you find it — the disk was 100% full because nobody noticed logs growing for 3 months. With proper monitoring, the story goes differently. Two weeks ago, an alert fired: 'Disk usage at 80%.' You set up log rotation. No 3 AM pager. Health checks are the simplest form of monitoring. Load balancers ping /health every 10 seconds. Kubernetes checks /readiness before sending traffic and /liveness to restart crashed containers. The difference: Liveness: 'Is the process alive?' If not, restart it. Readiness: 'Can it handle requests right now?' If not (still warming cache, etc.), don't send traffic yet but don't restart it either.",
    howItWorks: [
      { title: "Expose health endpoints", description: "Each service exposes /health (liveness) and /ready (readiness) HTTP endpoints that return 200 OK or 503." },
      { title: "Shallow vs deep checks", description: "Shallow: 'Is the process running?' (always fast). Deep: 'Can I connect to the database, cache, and dependencies?' (more thorough but slower)." },
      { title: "Load balancer checks", description: "Load balancers ping /health every 5-10 seconds. Unhealthy instances are removed from rotation. No traffic goes to broken servers." },
      { title: "Metrics collection", description: "Prometheus scrapes metrics every 15 seconds: request rate, error rate, latency percentiles (P50, P95, P99), resource usage." },
      { title: "Alerting on anomalies", description: "Grafana dashboards visualize trends. Alerts fire when metrics cross thresholds: P99 latency > 2s, error rate > 5%, CPU > 90%." },
    ],
    deepDive: [
      { title: "The RED Method", content: "For every service, monitor three things. Rate: requests per second. How busy is the service? Spike? Drop? Errors: errors per second (or error rate %). Is something broken? Duration: latency histogram (P50, P95, P99). Is the service getting slower? P50 = median (typical experience). P95 = 95th percentile (most users' worst experience). P99 = 99th percentile (tail latency). If P50 is 50ms but P99 is 5 seconds, 1% of your users have a terrible experience. You might not notice in averages but customers definitely notice." },
      { title: "Distributed Tracing", content: "In microservices, a single user request might traverse 10 services. When it's slow, which service is the bottleneck? Distributed tracing (Jaeger, Zipkin, Datadog APM) assigns a trace ID to each request and tracks it through every service. You see a waterfall view: Frontend → API Gateway (5ms) → User Service (12ms) → Database (150ms!) → Cache miss → Database again (200ms!). Now you know: the database is the bottleneck, specifically a cache miss causing a slow query. Without tracing, you'd spend hours guessing." },
      { title: "Alerting Best Practices", content: "The biggest mistake: alerting on everything. 'CPU at 60%' at 3 AM when nobody is affected = alert fatigue. Soon, engineers ignore alerts entirely. Better approach: Alert on symptoms, not causes. Don't alert on 'CPU is high.' Alert on 'P99 latency > 2s' or 'error rate > 1%.' These mean users are affected. Use severity levels: P0 (wake up, site is down), P1 (investigate next business day), P2 (look at this week). Every alert should be actionable — if someone gets paged, they should know exactly what to do. If an alert fires and the response is 'ignore it,' delete the alert." },
    ],
    whenToUse: [
      "Always — every production service needs health checks",
      "When using load balancers that need to know server health",
      "When running containers in Kubernetes",
      "When you need to meet SLAs and uptime requirements",
    ],
    useCases: [
      "Load balancer health checks to route away from unhealthy servers",
      "Kubernetes liveness probes to restart crashed pods",
      "Readiness probes to prevent traffic to uninitialized services",
      "Deep health checks verifying database and cache connectivity",
    ],
    tradeoffs: {
      pros: [
        "Enables automatic failover and self-healing",
        "Provides early warning of system degradation",
        "Essential for zero-downtime deployments",
        "Enables data-driven capacity planning",
      ],
      cons: [
        "Monitoring infrastructure has its own cost",
        "Alert fatigue from poorly tuned thresholds",
        "Deep health checks can be expensive if too frequent",
        "Observability data volume can be overwhelming",
      ],
    },
    realWorldExamples: [
      { company: "Datadog", description: "Provides comprehensive monitoring, APM, and log management used by Samsung and Peloton to observe distributed systems." },
      { company: "PagerDuty", description: "Integrates with health check systems to route alerts to on-call engineers, used by 65% of Fortune 100 companies." },
    ],
    relatedConcepts: ["circuit-breaker", "load-balancing", "auto-scaling"],
    keyTakeaway: "Implement /health and /ready endpoints on every service. Monitor the RED method: Rate, Errors, Duration.",
  },
  {
    id: "disaster-recovery",
    name: "Disaster Recovery",
    categoryId: "reliability",
    difficulty: "advanced",
    definition:
      "Disaster recovery covers strategies to restore availability after catastrophic failures. Key metrics: RTO (recovery time) and RPO (acceptable data loss).",
    importance:
      "Every system will face a disaster. Without a DR plan, these events cause permanent data loss and extended outages.",
    story:
      "On October 22, 2012, an engineer at GitLab accidentally ran rm -rf on the production database server. They had 5 backup methods configured. None of them worked. The database restoration process was live-streamed on YouTube while the team scrambled. They ultimately recovered — from a 6-hour-old staging snapshot someone happened to have. 6 hours of data was permanently lost. GitLab's post-mortem became the most famous disaster recovery failure in tech. The lesson was brutal but clear: A backup that hasn't been tested is not a backup. It's a wish. Netflix takes the opposite approach. They created Chaos Monkey — a tool that randomly kills production servers during business hours. Engineers MUST build systems that survive random failures because they're happening all the time. The result? When real disasters occur (AWS outages, network splits), Netflix keeps streaming while competitors go down.",
    howItWorks: [
      { title: "Define RTO and RPO", description: "RTO: How fast must you recover? (4 hours? 15 minutes? 0?) RPO: How much data loss is acceptable? (24 hours? 1 hour? Zero?)" },
      { title: "Design backup strategy", description: "Based on RPO: automated backups, point-in-time recovery, cross-region replication, or synchronous replication for zero data loss." },
      { title: "Build redundancy", description: "Multi-AZ deployment (survive data center failure), multi-region (survive regional outage), active-active (zero-downtime failover)." },
      { title: "Document runbooks", description: "Step-by-step procedures for every failure scenario: database failover, service restoration, DNS switching, communication plan." },
      { title: "Test regularly (game days)", description: "Simulate disasters quarterly: kill a database, fail over to backup, restore from scratch. Time it. Fix what breaks." },
    ],
    deepDive: [
      { title: "DR Tiers (Cost vs Recovery)", content: "Tier 1 — Backup & Restore: Cheapest. Backups stored in another region. Restore when disaster strikes. RTO: hours. RPO: last backup interval. Tier 2 — Pilot Light: Minimal standby environment. Database replicas running, but compute is off. On disaster, boot compute and switch DNS. RTO: 30 minutes. Tier 3 — Warm Standby: Scaled-down copy of production running in DR region. On disaster, scale up and switch. RTO: minutes. Tier 4 — Active-Active: Full production running in multiple regions simultaneously. On disaster of one region, others absorb traffic. RTO: 0 (automatic). RPO: 0. Cost: 2-3x." },
      { title: "Chaos Engineering", content: "Netflix's philosophy: don't wait for disasters — create them deliberately. Chaos Monkey: Randomly terminates production instances. Latency Monkey: Injects artificial delay. Chaos Kong: Simulates an entire AWS region going down. By constantly inducing failures, engineers build resilient systems by default. Other tools: Gremlin (commercial chaos platform), LitmusChaos (Kubernetes-native), AWS Fault Injection Simulator. Start small: kill one non-critical service. Observe. Fix. Then escalate to bigger failures." },
      { title: "The Communication Plan", content: "Technical recovery is half the battle. Communication is the other half. Who gets notified first? (On-call engineer, then team lead, then VP). How do you communicate with users? (Status page, social media, email). When do you update stakeholders? (Every 30 minutes during P0 incidents). What's the post-mortem process? (Blameless post-mortem within 48 hours, action items tracked to completion). Companies like Slack, GitHub, and Atlassian publish real-time status pages during incidents. Silence during an outage is worse than the outage itself." },
    ],
    whenToUse: [
      "When building any production system that stores data",
      "When regulatory compliance requires defined RTO/RPO",
      "When business impact of downtime is significant",
      "When operating across multiple regions",
    ],
    useCases: [
      "Multi-AZ database failover (active-passive)",
      "Cross-region replication for geographic redundancy",
      "Automated backup and point-in-time recovery",
      "Chaos engineering to validate DR readiness",
    ],
    tradeoffs: {
      pros: [
        "Ensures business continuity during catastrophic events",
        "Defined RTO/RPO sets clear recovery expectations",
        "Regular testing reveals weaknesses before real disasters",
        "Compliance with regulatory requirements",
      ],
      cons: [
        "Significant cost for redundant infrastructure",
        "Complexity of maintaining consistent DR environments",
        "DR testing can be disruptive and time-consuming",
        "False sense of security if not regularly tested",
      ],
    },
    realWorldExamples: [
      { company: "Netflix", description: "Created Chaos Monkey and the Simian Army to randomly kill production services, ensuring systems are always resilient." },
      { company: "GitHub", description: "After a 2018 outage caused by a network split, rebuilt HA architecture with Orchestrator for MySQL failover." },
    ],
    relatedConcepts: ["database-replication", "health-checks", "circuit-breaker"],
    keyTakeaway: "A disaster recovery plan that hasn't been tested is just a wish. Run game days and chaos experiments regularly.",
  },

  // ═══════════════════════════════════════
  // STORAGE & CDN
  // ═══════════════════════════════════════
  {
    id: "cdn",
    name: "Content Delivery Network (CDN)",
    categoryId: "storage",
    difficulty: "beginner",
    definition:
      "A CDN is a globally distributed network of edge servers that cache and serve content from locations close to users, reducing latency.",
    importance:
      "CDNs can reduce page load times by 50%+ and slash bandwidth costs. For global applications, they're not optional.",
    story:
      "Your web server is in Virginia. A user in Tokyo loads your page. Each HTTP request travels 14,000 km to Virginia and 14,000 km back — 28,000 km round trip. At the speed of light (in fiber), that's ~140ms just for the physics. But a typical page loads 50+ resources (HTML, CSS, JS, images, fonts). If each requires a round trip, that's 50 × 140ms = 7 seconds just for network latency. Now put a CDN edge server in Tokyo. The first user's request goes to Virginia (slow). The CDN caches the response in Tokyo. Every subsequent user in Tokyo gets the content in 5ms from the local edge server. 140ms → 5ms. That's a 28x improvement. And it's not just speed — the origin server in Virginia handles 90% fewer requests because the CDN absorbs them. Your $100/month server now handles the same traffic that would've required a $1,000/month server. Cloudflare does this across 300+ cities worldwide, serving 20% of all internet traffic.",
    howItWorks: [
      { title: "User requests a resource", description: "User in Tokyo requests your-site.com/image.jpg. DNS resolves to the nearest CDN edge server (Tokyo PoP)." },
      { title: "Edge server checks cache", description: "The Tokyo edge server checks if it has a cached copy of image.jpg. If yes (cache hit), it serves immediately." },
      { title: "Cache miss → origin fetch", description: "If not cached (cache miss), the edge server fetches image.jpg from your origin server in Virginia." },
      { title: "Response cached at edge", description: "The edge server caches the response (based on Cache-Control headers) and returns it to the user." },
      { title: "Subsequent requests served locally", description: "All future requests from the Tokyo region are served from the local cache in ~5ms instead of ~140ms." },
    ],
    deepDive: [
      { title: "Cache-Control Headers", content: "You control CDN caching behavior with HTTP headers. Cache-Control: public, max-age=86400 — CDN and browsers can cache for 24 hours. Cache-Control: private, no-cache — CDN must not cache (for user-specific content). Cache-Control: s-maxage=3600 — CDN caches for 1 hour (overrides max-age for shared caches). ETag/Last-Modified: enables conditional requests — CDN asks origin 'has this changed?' before re-fetching. Content with user data (API responses, HTML with auth) should be private and not cached by CDN. Static assets (images, CSS, JS) should be cached aggressively with content-based URLs for cache busting." },
      { title: "Edge Computing", content: "Modern CDNs don't just cache — they compute. Cloudflare Workers, AWS Lambda@Edge, Vercel Edge Functions run code at the edge server closest to the user. Use cases: A/B testing (route users at the edge without hitting origin), geolocation-based content (serve different content by country), authentication (validate JWTs at the edge, reject bad requests before they reach your server), and API responses (compute personalized responses at the edge using cached data). This brings your application logic to within 20ms of every user on the planet." },
      { title: "CDN for Dynamic Content", content: "CDNs are traditionally for static content, but modern CDNs can accelerate dynamic content too. Dynamic Site Acceleration (DSA) uses optimized network paths between edge and origin (private backbone instead of public internet). Argo Smart Routing (Cloudflare) finds the fastest path through their network, reducing origin latency by 30%. Even if you can't cache the response, the network path optimization alone provides significant speedups for API calls and dynamic pages." },
    ],
    whenToUse: [
      "When serving static assets (images, CSS, JavaScript, fonts)",
      "When your users are geographically distributed",
      "When you need to handle traffic spikes without scaling origin servers",
      "When you want to improve Core Web Vitals and SEO",
    ],
    useCases: [
      "Static asset delivery for web applications",
      "Video streaming with adaptive bitrate",
      "API response caching at the edge",
      "DDoS protection via edge absorption",
    ],
    tradeoffs: {
      pros: [
        "Dramatically reduces latency for global users",
        "Reduces load on origin servers",
        "Provides DDoS protection at the edge",
        "Improves SEO scores through faster page loads",
      ],
      cons: [
        "Cache invalidation can be slow and complex",
        "Cost per GB transfer adds up at scale",
        "Dynamic content benefits are limited",
        "Debugging cache issues can be frustrating",
      ],
    },
    realWorldExamples: [
      { company: "Cloudflare", description: "Serves 20%+ of all internet traffic through 300+ global edge locations, providing CDN, DDoS protection, and edge computing." },
      { company: "Netflix", description: "Operates Open Connect — their own CDN, placing content servers inside ISP networks to deliver 15% of global internet traffic." },
    ],
    relatedConcepts: ["caching-strategies", "reverse-proxy", "object-storage"],
    keyTakeaway: "Put a CDN in front of all static assets immediately. It's one of the highest ROI infrastructure decisions you can make.",
  },
  {
    id: "object-storage",
    name: "Object Storage (S3)",
    categoryId: "storage",
    difficulty: "beginner",
    definition:
      "Object storage stores data as objects (files + metadata) in a flat namespace. Amazon S3 offers virtually unlimited storage with eleven 9s of durability.",
    importance:
      "Object storage is the backbone of modern data infrastructure — user uploads, backups, data lakes, and ML datasets at a fraction of block storage cost.",
    story:
      "In 2006, Amazon launched S3 with a wild promise: store unlimited data for fractions of a penny per gigabyte, with 99.999999999% durability (eleven 9s — meaning if you store 10 million objects, you'd expect to lose one every 10,000 years). It sounded too good to be true. Today, S3 stores over 100 trillion objects. Every time you upload a photo to Instagram, share a file on Slack, or stream a video on Netflix, there's a good chance it's served from object storage. The key insight: most data is written once and read many times (WORM — write once, read many). Photos, logs, backups, documents — they don't change after creation. Object storage is optimized for this pattern. It's incredibly cheap ($0.023/GB/month for standard), insanely durable (data is replicated across at least 3 data centers), and scales infinitely (no pre-provisioning needed). Dropbox originally built entirely on S3. When they reached exabyte scale, they built their own object store (Magic Pocket) to save money — but that took a team of 100+ engineers and years of work.",
    howItWorks: [
      { title: "Upload an object", description: "PUT /bucket-name/path/to/file.jpg with the file content. S3 stores it and returns a unique URL for retrieval." },
      { title: "Data replicated across AZs", description: "S3 automatically replicates the object across at least 3 Availability Zones for durability. You don't configure this." },
      { title: "Retrieve by key", description: "GET /bucket-name/path/to/file.jpg returns the object. Keys are flat (no real directories), but '/' in paths simulates folders." },
      { title: "Metadata and tagging", description: "Each object has system metadata (size, content-type, last-modified) and custom tags for lifecycle management." },
      { title: "Lifecycle policies", description: "Automatically move old objects to cheaper storage tiers or delete them. S3 Standard → S3 Glacier (archive) after 90 days." },
    ],
    deepDive: [
      { title: "Storage Tiers and Cost Optimization", content: "S3 Standard: $0.023/GB. Frequent access. Sub-second retrieval. S3 Infrequent Access (IA): $0.0125/GB but $0.01/GB retrieval fee. For backups accessed monthly. S3 Glacier: $0.004/GB. Archive storage. Retrieval takes minutes to hours. For compliance data. S3 Glacier Deep Archive: $0.00099/GB. Cheapest. Retrieval takes 12-48 hours. For data you legally must keep but never access. Intelligent Tiering: Automatically moves objects between tiers based on access patterns. Small monitoring fee but saves money automatically. A typical setup: new uploads → Standard (90 days) → IA (1 year) → Glacier (7 years) → Delete." },
      { title: "Pre-signed URLs", content: "Problem: S3 objects are private by default. How do you let users upload directly to S3 without exposing your AWS credentials? Pre-signed URLs. Your server generates a time-limited URL (valid for 15 minutes) that grants specific permissions (PUT to a specific key). The client uploads directly to S3 using this URL — no data flows through your server. Benefits: your server's bandwidth and CPU are not consumed by file uploads, uploads are parallel and fast, and the URL expires automatically. Pattern: client → your API (get pre-signed URL) → client → S3 directly (upload file)." },
      { title: "Object Storage vs Block Storage vs File Storage", content: "Object Storage (S3): Flat namespace, HTTP API, unlimited scale, no modification (replace only). Best for: images, videos, backups, logs, data lakes. Block Storage (EBS): Raw disk blocks attached to VMs. Best for: databases, OS boot volumes, anything needing low-latency random I/O. File Storage (EFS/NFS): Hierarchical filesystem, shared across multiple servers. Best for: shared configuration, CMS media, legacy apps. Rule of thumb: if your application writes a file and never modifies it again, use object storage. If it reads/writes random parts of a file, use block storage." },
    ],
    whenToUse: [
      "When storing unstructured data (images, videos, documents)",
      "When you need virtually unlimited storage capacity",
      "When data needs to be accessed via HTTP/API",
      "When building data lakes or backup systems",
    ],
    useCases: [
      "User-generated content (profile photos, file uploads)",
      "Static website hosting",
      "Data lake for analytics and ML",
      "Database backups and log archival",
    ],
    tradeoffs: {
      pros: [
        "Virtually unlimited storage capacity",
        "Extremely durable (11 nines with S3)",
        "Very cost-effective for large data volumes",
        "Built-in versioning and lifecycle management",
      ],
      cons: [
        "Higher latency than local/block storage",
        "Not suitable for frequently modified data",
        "Eventual consistency in some implementations",
        "Data transfer costs can be significant",
      ],
    },
    realWorldExamples: [
      { company: "Dropbox", description: "Originally built entirely on S3, later migrated to their own object storage (Magic Pocket) to reduce costs at enormous scale." },
      { company: "Airbnb", description: "Uses S3 to store all listing photos, with a processing pipeline that resizes and optimizes images for different devices." },
    ],
    relatedConcepts: ["cdn", "database-replication"],
    keyTakeaway: "Use object storage for anything that doesn't need to be in a database. It's cheap, durable, and scales infinitely.",
  },
  // ═══════════════════════════════════════
  // FUNDAMENTALS
  // ═══════════════════════════════════════
  {
    id: "processes-and-threads",
    name: "Processes & Threads",
    categoryId: "fundamentals",
    difficulty: "beginner",
    definition:
      "A process is an executing program with its own memory space. A thread is the smallest unit of execution within a process. Multiple threads share the same process memory.",
    importance:
      "Understanding concurrency vs. parallelism, context switching, and resource sharing is the foundation of high-performance backend programming.",
    story:
      "Think of a kitchen as a 'Process'. It has its own fridge (memory), stoves, and knives (resources). If you want to cook two different meals at the same time, you have two options. You could build a completely new kitchen next door (a new Process) with its own fridge and stove. This is very safe—what happens in one kitchen doesn't affect the other—but building a whole new kitchen is expensive and slow (high overhead). The second option is to hire another chef (a Thread) to work in the same kitchen. This is much faster and cheaper to start up. Both chefs share the same fridge and stove (shared memory space). This is incredibly efficient, but dangerous: if both chefs try to grab the same knife at the exact same time without coordinating, someone gets cut (a race condition). Multithreading is about coordinating those chefs so they can work together in shared space safely.",
    howItWorks: [
      { title: "Process Creation", description: "The OS allocates a completely isolated memory space and assigns a Process ID (PID). High overhead." },
      { title: "Thread Creation", description: "The process spawns a new thread. It gets its own stack (for local variables) but shares the heap (global memory) with the process. Low overhead." },
      { title: "Concurrency", description: "A single CPU core rapidly switches between threads (Context Switching) so fast it looks like they run simultaneously." },
      { title: "Parallelism", description: "Multiple CPU cores execute different threads at the exact same physical time. True simultaneous execution." },
      { title: "Synchronization", description: "Threads use Locks/Mutexes to ensure only one thread accesses a shared resource at a time, preventing data corruption." },
    ],
    deepDive: [
      { title: "Context Switching Cost", content: "When the CPU switches from Thread A to Thread B, it must save A's state (registers, program counter) and load B's state. This 'context switch' takes a few microseconds. A few microseconds is fast, but if you have 10,000 threads, the CPU spends all its time switching contexts and no time actually doing work (thrashing). This is why creating 10,000 OS threads is a bad idea, and why Event Loops (Node.js) or Green Threads (Go routines) are used for massive concurrency." },
      { title: "Race Conditions & Deadlocks", content: "Race condition: Thread A reads balance = 100. Thread B reads balance = 100. Thread A adds 50 (150) and saves. Thread B adds 50 (150) and saves. Final balance is 150, but it should be 200. To fix this, we use a Mutex (Lock). But Mutexes cause Deadlocks: Thread A locks Resource X and waits for Resource Y. Thread B locks Resource Y and waits for Resource X. Both wait forever." },
      { title: "Threads vs Event Loop (Node.js/Redis)", content: "Node.js and Redis are single-threaded for processing. How can they handle 10,000 concurrent users? Asynchronous I/O. When a Node.js server needs to read from a database (which takes 10ms), it doesn't block the thread. It sends the request to the OS and moves on to serve the next user. When the DB is done, the OS notifies the event loop, and Node picks it up. 1 thread, huge concurrency, zero locks." },
    ],
    whenToUse: [
      "Use Threads for CPU-bound tasks (image processing, video encoding, cryptography)",
      "Use Processes for isolation (e.g., Chrome tabs are separate processes so one crashing tab doesn't kill the browser)",
      "Use Asynchronous Event Loops for I/O-bound tasks (web servers, database queries)",
    ],
    useCases: [
      "Web servers handling thousands of concurrent requests",
      "Background workers processing jobs in parallel",
      "Database engines managing concurrent transactions",
      "Operating systems running multiple programs",
    ],
    tradeoffs: {
      pros: [
        "Threads provide fast context switching and easy memory sharing",
        "Processes provide strong isolation and security",
        "Parallelism fully utilizes hardware resources (multi-core CPUs)",
      ],
      cons: [
        "Multithreaded programming is notoriously difficult to debug",
        "Race conditions and deadlocks are common pitfalls",
        "Shared memory requires expensive locking mechanisms",
      ],
    },
    realWorldExamples: [
      { company: "Google Chrome", description: "Pioneered multi-process architecture for browsers. Each tab is a separate process, so a crash in one tab doesn't take down the whole browser." },
      { company: "Golang", description: "Uses 'Goroutines' (lightweight green threads managed by the Go runtime, not the OS). You can safely spawn 100,000 goroutines on a laptop." },
    ],
    relatedConcepts: ["serverless-vs-serverful"],
    keyTakeaway: "Threads share memory; Processes do not. Shared memory enables high performance but introduces race conditions.",
  },
  {
    id: "memory-paging",
    name: "Memory: Paging & Virtual Memory",
    categoryId: "fundamentals",
    difficulty: "advanced",
    definition:
      "Paging is an OS memory management scheme that eliminates the need for contiguous allocation of physical memory. Virtual memory gives software the illusion of a massive, contiguous memory space.",
    importance:
      "Understanding paging is essential for understanding cache performance, garbage collection pauses, and why memory access can suddenly become 1,000x slower.",
    story:
      "Imagine you work in a tiny office with a very small desk (Physical RAM) but you have a massive library of books down the hall (Disk/SSD). You're working on a huge project that requires 50 books (Virtual Memory). You can't fit 50 books on your desk. So, you bring 5 books to your desk. These books are grouped into 'Pages'. When you need to read a page that isn't on your desk, you have to stop what you're doing, walk down the hall, put one book back, and bring the new book to your desk. This walking process is a 'Page Fault'. It takes forever compared to just reading a book already in front of you. An Operating System does this for every program. It gives your program the illusion that it has 16GB of RAM entirely to itself, but in reality, the OS is furiously shuffling 4KB 'pages' of data between the physical RAM and the hard drive to make that illusion work. When it shuffles too much, the system grinds to a halt—a state known as 'thrashing'.",
    howItWorks: [
      { title: "Virtual Address Space", description: "The OS assigns every running process a massive, fake (virtual) memory space starting from address 0." },
      { title: "Divide into Pages", description: "The OS divides virtual memory into equal-sized blocks called 'Pages' (typically 4KB). Physical RAM is divided into 'Frames' of the same size." },
      { title: "Page Table Mapping", description: "The OS maintains a 'Page Table' that maps which Virtual Page is currently sitting in which Physical Frame." },
      { title: "Page Faults", description: "When a program asks for memory that is NOT currently in RAM, the CPU throws an exception (Page Fault)." },
      { title: "Swapping", description: "The OS halts the program, finds an old, unused page in RAM, writes it to disk (Swap space), loads the requested page from disk into RAM, updates the table, and resumes the program." },
    ],
    deepDive: [
      { title: "Why Paging Matters to Devs", content: "RAM latency is ~100 nanoseconds. SSD latency is ~100,000 nanoseconds. If your application works on a dataset that is slightly larger than physical RAM, the OS will constantly trigger Page Faults, swapping data to SSD and back. Your app's performance won't drop by 10%—it will completely fall off a cliff and become 1,000x slower. Knowing your working set size fits in physical RAM is critical for database architecture." },
      { title: "Translation Lookaside Buffer (TLB)", content: "To map a virtual address to a physical address, the CPU must read the Page Table from RAM. This means every memory access requires TWO memory accesses (one for the table, one for the data). To speed this up, CPUs have a TLB—a tiny, blazingly fast hardware cache inside the CPU that stores recent virtual-to-physical translations. High-performance databases (like PostgreSQL) use 'Huge Pages' (e.g., 2MB instead of 4KB) so the TLB can cover a vastly larger amount of RAM without missing." },
      { title: "Memory Fragmentation", content: "Before paging, OS's used contiguous memory allocation. If you needed 10MB, the OS had to find an unbroken 10MB block of RAM. If you had twenty 1MB gaps scattered around RAM, you had 20MB free, but the allocation would fail. Paging solves this completely. Because a program's pages can be scattered entirely randomly across physical RAM frames, external fragmentation is eliminated." },
    ],
    whenToUse: [
      "To allow the illusion of more RAM than physically exists via Swap space",
      "To provide absolute memory isolation between different processes (security)",
      "To eliminate external memory fragmentation",
    ],
    useCases: [
      "Running modern multitasking Operating Systems (Linux, Windows, macOS)",
      "Database tuning (configuring Huge Pages for Postgres/Oracle)",
      "Understanding out-of-memory (OOM) killer triggers in Kubernetes",
    ],
    tradeoffs: {
      pros: [
        "Processes are completely isolated from each other for security",
        "Programs can be larger than physical RAM",
        "Solves external memory fragmentation",
      ],
      cons: [
        "Page tables consume memory themselves",
        "Virtual-to-physical translation adds slight overhead",
        "Swapping to disk (thrashing) destroys performance",
      ],
    },
    realWorldExamples: [
      { company: "PostgreSQL", description: "Heavily relies on OS page caching. Database documentation strongly recommends configuring Linux Huge Pages to improve TLB cache hit rates for massive memory pools." },
      { company: "Linux Out Of Memory (OOM) Killer", description: "When physical RAM and swap space are entirely exhausted, the Linux OS randomly assassinates processes to reclaim pages, often killing databases or apps." },
    ],
    relatedConcepts: ["processes-and-threads", "redis-memcached"],
    keyTakeaway: "Virtual memory isolates processes and relies on 4KB pages. If your working dataset exceeds physical RAM, page faults (swapping) will absolutely destroy your latency.",
  },
  {
    id: "how-internet-works",
    name: "How the Internet Works",
    categoryId: "fundamentals",
    difficulty: "beginner",
    definition:
      "The internet is a global network of networks communicating via standardized protocols (TCP/IP). It routes packets of data between devices through routers, switches, and deep-sea submarine cables.",
    importance:
      "A conceptual understanding of DNS, routing, and TCP/IP is required to debug network latency, configure firewalls, and architect global distributed systems.",
    story:
      "You type 'google.com' into your browser and press Enter. What happens in the next 100 milliseconds is a miracle of human engineering. First, your computer doesn't know what 'google.com' is—it only speaks numbers. So it asks a DNS server (like a phonebook), 'What's the IP address for google.com?' DNS replies: '142.250.190.46'. Now your browser needs to send a request (a letter) to that IP. But the letter is too big, so it chops the letter into a thousand pieces (Packets). Each packet gets an envelope with a destination address and a sequence number. The packets leave your wifi, hit your ISP, and jump from router to router across the country. They don't take the same path—if one router crashes, packets route around the damage dynamically (BGP). They finally arrive at Google's servers. Some packets arrived out of order, one was dropped completely. The receiving server uses TCP to ask for the missing packet, reassembles all 1,000 pieces in the correct order, reads the request, and sends the HTML response back the exact same way.",
    howItWorks: [
      { title: "URL to IP (DNS)", description: "The browser resolves the human-readable domain name into an IP address via the Domain Name System." },
      { title: "TCP Handshake", description: "A connection is established using a 3-way handshake (SYN, SYN-ACK, ACK) to ensure both sides are ready to communicate." },
      { title: "Packetization", description: "Data is split into small packets (usually ~1500 bytes). Each packet contains a header with source, destination, and sequence." },
      { title: "Routing (BGP/IP)", description: "Routers forward packets hop-by-hop across Autonomous Systems (managed by ISPs) using the Border Gateway Protocol to find the best path." },
      { title: "Reassembly", description: "The recipient acknowledges received packets and reassembles them. If a packet is missing, it requests retransmission." },
    ],
    deepDive: [
      { title: "The OSI Model (7 Layers)", content: "We divide networking into abstract layers to separate concerns. Layer 1 (Physical): Submarine cables and radio waves. Layer 2 (Data Link): MAC addresses, Ethernet switches. Layer 3 (Network): IP addresses, routers. Layer 4 (Transport): TCP/UDP, ports (80, 443). Layer 7 (Application): HTTP, DNS, WebSockets. When you build APIs, you work in Layer 7. When you configure AWS Security Groups, you're working in Layer 4. When you debug BGP routing misconfigurations, you're in Layer 3." },
      { title: "BGP: The Duct Tape of the Internet", content: "The Border Gateway Protocol (BGP) is how major internet hubs talk to each other. An ISP broadcasts to the world: 'If you want to reach IP range 142.x.x.x, route the traffic through me.' If an underwater cable between NY and London is severed, BGP routing tables update dynamically worldwide to route traffic through Paris instead. This decentralized routing is incredibly resilient, but extremely vulnerable to human error (a typo in a BGP configuration routinely takes down entire countries)." },
      { title: "Latency is bound by the Speed of Light", content: "Data travels through fiber-optic cables at about 2/3 the speed of light in a vacuum (~200,000 km per second). The distance between New York and Sydney is 16,000 km. The absolute physical minimum round-trip time (RTT) is 160ms. No amount of money or software optimization can solve physics. This is why Content Delivery Networks (CDNs) exist—to move data physically closer to the user." },
    ],
    whenToUse: [
      "To understand why CDNs are physically necessary",
      "To debug networking issues between microservices",
      "To structure network security rules and firewalls",
    ],
    useCases: [
      "Designing globally distributed multi-region databases",
      "Troubleshooting API latency and timeouts",
      "Configuring VPCs, subnets, and routing tables in the cloud",
    ],
    tradeoffs: {
      pros: [
        "Packet-switched networks (IP) are incredibly resilient to node failures",
        "Layered models allow innovation (HTTP evolved while TCP stayed the same)",
        "Decentralized BGP routing prevents a single point of failure",
      ],
      cons: [
        "Packets can be lost, requiring complex protocols (TCP) to ensure reliability",
        "Network latency is unpredictable compared to local communication",
        "Public transit poses security risks without encryption (TLS)",
      ],
    },
    realWorldExamples: [
      { company: "Cloudflare 1.1.1.1", description: "Runs one of the world's largest, fastest public DNS resolvers, dramatically cutting the time it takes for step 1 of the internet journey." },
      { company: "Facebook (2021 Outage)", description: "Facebook suffered a 6-hour global outage because an engineer pushed a bad BGP configuration. Facebook essentially erased itself from the internet's global routing table." },
    ],
    relatedConcepts: ["cdn", "networking-protocols"],
    keyTakeaway: "The internet is a decentralized network of routers passing packets. All optimizations eventually run into the physical limit of the speed of light.",
  },
  {
    id: "spof",
    name: "Single Point of Failure (SPOF)",
    categoryId: "fundamentals",
    difficulty: "beginner",
    definition:
      "A Single Point of Failure (SPOF) is a component of a system that, if it fails, will stop the entire system from working.",
    importance:
      "Identifying and eliminating SPOFs is the primary objective of high-availability system design. A system is only as reliable as its weakest necessary link.",
    story:
      "You've built an incredible e-commerce system. You have 50 web servers (Auto-scaled). You have 10 cache nodes (Redis cluster). You have 5 App servers orchestrating orders. Your infrastructure is heavily distributed. But all of these servers point to a single PostgreSQL database instance to read and write. One day, the power supply on that database server burns out. Your web servers are fine. Your cache is fine. Your app servers are fine. But nobody can buy anything, the site shows error 500s, and you are 100% down. That PostgreSQL database was a Single Point of Failure. It doesn't matter how robust the rest of the ship is if there's only one engine and it dies. High availability engineering is the tedious, expensive process of making sure that for every critical component, there is a standby ready to take over immediately.",
    howItWorks: [
      { title: "Identify Critical Paths", description: "Trace a user's request from DNS down to the database and back. Map out every component involved." },
      { title: "Look for singletons", description: "If there is only one DNS provider, one Load Balancer, or one Database Master, you have found a SPOF." },
      { title: "Add Redundancy (Active/Active)", description: "Deploy two instances of the component that share traffic. If one dies, the other takes 100% of the load." },
      { title: "Add Redundancy (Active/Passive)", description: "Deploy a primary and a standby. If the primary dies, an automated failover promotes the standby." },
      { title: "Remove State", description: "Make sure components (like web servers) don't store local state, so any instance can die and be replaced seamlessly." },
    ],
    deepDive: [
      { title: "Where SPOFs Hide", content: "SPOFs aren't always servers. They can be third-party services (e.g., your login depends entirely on Auth0). They can be network paths (a single ISP connecting your office to the cloud). They can even be people: if only one engineer named Dave knows how to deploy the configuration changes, Dave is a Single Point of Failure. If Dave goes on vacation and a certificate expires, the system goes down." },
      { title: "The Database Dilemma", content: "Databases are the hardest SPOF to eliminate. Web servers are stateless — want 5 more? Just click a button. Databases hold state (truth). If you have two database masters accepting writes simultaneously across the country, you run into severe data consistency problems (CAP theorem). Eliminating a database SPOF typically involves a Primary-Replica setup with an automated orchestrator (like Patroni or Amazon RDS Multi-AZ) that watches the primary and routes traffic to the replica in seconds if the primary drops." },
      { title: "Availability Nines", content: "We measure reliability in 'Nines'. 99% availability (Two Nines) means 3.65 days of downtime per year. 99.9% (Three Nines) is 8.7 hours of downtime. 99.99% (Four Nines) is 52 minutes. Eliminating SPOFs is how you move from Two Nines to Four Nines. Moving to Five Nines (5 minutes of downtime a year) requires eliminating entire geographic regions as SPOFs (Multi-region active/active architectures)." },
    ],
    whenToUse: [
      "When auditing a system architecture for production readiness",
      "During threat modeling and disaster recovery planning",
      "When deciding where to allocate infrastructure budgets",
    ],
    useCases: [
      "Multiple DNS servers (Route53 + Cloudflare)",
      "Redundant Load Balancers (AWS ALB is implicitly multi-node)",
      "Database High-Availability pairs",
    ],
    tradeoffs: {
      pros: [
        "Dramatically increases system uptime and availability",
        "Prevents catastrophic business outages",
        "Allows for zero-downtime maintenance (intentionally taking a node down)",
      ],
      cons: [
        "Redundancy costs money (paying for servers you hope not to use)",
        "Increases architectural complexity (failover mechanisms, replication lag)",
        "Automated failovers can sometimes trigger accidentally, causing 'split-brain' scenarios",
      ],
    },
    realWorldExamples: [
      { company: "AWS Single-AZ Deployments", description: "An AWS Availability Zone (AZ) is a single data center. If you deploy entirely in us-east-1a, you have a SPOF. When that facility loses power, you are down. RDS Multi-AZ eliminates this." },
      { company: "Dyn DNS Attack (2016)", description: "Major sites like Twitter, Reddit, and Netflix went down. Their SPOF wasn't their servers; it was that they all relied on a single DNS provider (Dyn), which suffered a massive DDoS attack." },
    ],
    relatedConcepts: ["disaster-recovery", "load-balancing", "database-replication"],
    keyTakeaway: "Draw your architecture on a whiteboard. Erase any one node. If the system stops working, you have a SPOF. Fix it.",
  },
  // ═══════════════════════════════════════
  // DATABASE
  // ═══════════════════════════════════════
  {
    id: "data-migration",
    name: "Data Migration (Databases)",
    categoryId: "database",
    difficulty: "advanced",
    definition:
      "Data migration is the process of transferring data between storage types, formats, or systems, often with zero downtime in production environments.",
    importance:
      "Changing database schemas or moving to a new database engine while serving live traffic is one of the riskiest operations in backend engineering.",
    story:
      "You have an 'Orders' table with 10 million rows. You realize you need to split the 'CustomerName' column into 'FirstName' and 'LastName'. In a sandbox, you just write `ALTER TABLE Orders ADD COLUMN FirstName; UPDATE Orders SET FirstName = split(...);`. That takes 20 minutes. If you run that in production, the database locks the table for 20 minutes. No one can buy anything. Your CEO calls you in a panic. You need a zero-downtime migration. You must do a delicate dance: 1) Add the new columns (empty). 2) Change the application code to write to BOTH old and new columns. 3) Run a slow, background script to copy old data to the new columns in small batches (backfilling). 4) Change application code to read from the new columns. 5) Drop the old columns. This multi-step process takes 3 weeks instead of 20 minutes, but the customer never noticed a thing. This is how migrations are done at scale.",
    howItWorks: [
      { title: "Dual-Write Phase", description: "Deploy code that writes incoming data to BOTH the old schema/database and the new schema/database simultaneously." },
      { title: "Backfill Old Data", description: "Run a background script that takes historical data from the old schema, transforms it, and writes it to the new schema in small batches (to avoid DB locks)." },
      { title: "Verification", description: "Read from both schemas and compare the results in the background. Log any mismatches to ensure the new schema is 100% accurate." },
      { title: "Switch Reads", description: "Deploy code that stops reading from the old schema and reads exclusively from the new schema." },
      { title: "Cleanup", description: "Stop dual-writing. Drop the old columns or decommission the old database entirely." },
    ],
    deepDive: [
      { title: "CDC (Change Data Capture)", content: "Instead of having app code 'dual write' (which is error-prone if the second write fails), modern migrations use CDC. Tools like Debezium read the database's internal transaction log (Write-Ahead Log in Postgres, Binlog in MySQL). Every time a row is inserted/updated, Debezium streams that change to Kafka. A consumer reads the stream and applies the change to the new database. This moves the complexity of synchronization out of the application code." },
      { title: "Online Schema Migrations (gh-ost / pt-online-schema-change)", content: "Adding an index to a billion-row MySQL table locks it for hours. Open-source tools solve this. They create a 'Ghost' table with the new schema, copy data over slowly, intercept live changes using triggers or binlogs and apply them to the Ghost table, and finally do an atomic RENAME command swapping the tables in milliseconds. The app never experiences a lock." },
      { title: "The Expand-and-Contract Pattern", content: "Never rename a column in one step. Expand: add the new column, write to both. Migrate data. Contract: stop writing to the old column, drop it. Every schema change must be backward compatible, so if you must rollback the application code, the old code still works perfectly with the new database schema." },
    ],
    whenToUse: [
      "When upgrading database engines (e.g., MySQL 5.7 to 8.0)",
      "When shifting from a Monolith DB to Microservice-specific DBs",
      "When making heavy schema modifications to massive tables",
    ],
    useCases: [
      "Migrating from on-premise Oracle to AWS Aurora PostgreSQL",
      "Splitting a massive user table into multiple normalized tables",
      "Moving unstructured JSON data into a dedicated NoSQL store",
    ],
    tradeoffs: {
      pros: [
        "Enables evolving architecture without downtime",
        "Ensures data integrity during massive changes",
        "Allows safe rollbacks if the new system has bugs",
      ],
      cons: [
        "Extremely complex and time-consuming heavily orchestrated process",
        "Dual-writing increases database load and application complexity",
        "Risk of data inconsistency if dual-writes or backfills fail silently",
      ],
    },
    realWorldExamples: [
      { company: "Stripe", description: "Executed a massive migration of hundreds of billions of rows from their legacy database to a new sharded architecture using CDC and dual-writes, with zero seconds of downtime." },
      { company: "GitHub", description: "Maintains 'gh-ost', an open-source tool for online schema migrations in MySQL, because native ALTER TABLE statements took their site down." },
    ],
    relatedConcepts: ["event-streaming"],
    keyTakeaway: "Zero-downtime migrations require the 'Expand and Contract' pattern with dual-writes and background backfilling. Never lock a production table.",
  },
  {
    id: "data-partitioning",
    name: "Data Partitioning",
    categoryId: "database",
    difficulty: "advanced",
    definition:
      "Partitioning divides large logical tables into smaller physical tables to improve manageability, query performance, and availability without altering the application's view of the data.",
    importance:
      "When a table exceeds tens of millions of rows, indexes become huge and queries slow down. Partitioning keeps indexes small and queries fast.",
    story:
      "Imagine a filing cabinet for 'Sales Receipts'. For the first year, it's fine. By year five, you have 10 million receipts crammed into one drawer. Finding a receipt from yesterday takes 10 minutes because you have to push past millions of old ones. This is a massive database table. Partitioning is buying five separate drawers labeled '2020', '2021', '2022', '2023', '2024'. To the business, it's still just the 'Sales Receipts' system. But when a manager asks 'How many sales did we make yesterday?', you don't even look in the 2020 to 2023 drawers. You walk straight to the 2024 drawer and find it instantly. This is 'Range Partitioning'. You haven't split the data across different servers (that's Sharding). The data is all on the same database server, but the database engine manages it in separate, smaller physical files, making index lookups lightning fast.",
    howItWorks: [
      { title: "Choose Partition Key", description: "Select the column used to divide the data. `created_at` (date) is the most common for time-series data." },
      { title: "Define Strategy", description: "Range (by date/value ranges), List (by specific values e.g., 'Status=Active' vs 'Status=Archived'), or Hash (MOD on an ID)." },
      { title: "Database creates sub-tables", description: "The single logical `orders` table is converted into physical tables `orders_2023_01`, `orders_2023_02`, etc." },
      { title: "Partition Pruning", description: "When querying `SELECT * FROM orders WHERE date = '2024-01-05'`, the database ignores all partitions except January 2024." },
      { title: "Data Archival", description: "Instead of a slow `DELETE FROM orders WHERE date < 2020`, you instantly run `DROP TABLE orders_2019`." },
    ],
    deepDive: [
      { title: "Partitioning vs Sharding", content: "Partitioning splits a table into multiple files on the SAME database server. It helps with large indexes and local query speed. Sharding splits a table across MULTIPLE database servers. It helps with scaling CPU, Memory, and Disk space beyond what one machine can handle. Sharding is 100x more complex. Always partition before you shard." },
      { title: "Vertical vs Horizontal Partitioning", content: "Horizontal Partitioning (the standard) splits rows: rows 1-5M go here, 5M-10M go there. Vertical Partitioning splits columns: highly accessed columns (name, email) go in one table, rarely accessed huge columns (bio_text, avatar_blob) go in another table. Vertical partitioning reduces the physical row size, allowing the database to fit vastly more heavily-accessed records into RAM." },
      { title: "The Pitfall of Global Indexes", content: "If you partition by Date, queries by Date are fast. But what if you query `WHERE user_id = 999`? The database doesn't know WHICH date partition the user is in, so it has to scan every single partition. To fix this, databases can build 'Global Indexes' across all partitions, but updating a global index during a write operation is slow. The partition key must align with your most common query patterns." },
    ],
    whenToUse: [
      "When a table exceeds the size of physical memory (RAM)",
      "When you frequently purge historical data (dropping a partition is instant)",
      "When queries naturally filter along a specific dimension (time/date)",
    ],
    useCases: [
      "Time-series data: logs, analytics events, metrics (partitioned by day/month)",
      "Multi-tenant SaaS: partitioning by tenant_id (if not sharding)",
      "Separating 'Hot' data (recent orders) from 'Cold' data (archived orders)",
    ],
    tradeoffs: {
      pros: [
        "Dramatically improves query speed via Partition Pruning",
        "Makes deleting bulk historical data instant (DROP PARTITION)",
        "Keeps indexes small and memory-efficient",
      ],
      cons: [
        "Queries not filtering by the partition key will degrade in performance",
        "Requires maintenance (scripts to create next month's partition)",
        "Foreign keys referencing partitioned tables can be complex or restricted",
      ],
    },
    realWorldExamples: [
      { company: "PostgreSQL", description: "Native Declarative Partitioning allows defining Range or List partitions effortlessly, heavily used for time-series event data." },
      { company: "Financial Systems", description: "Stock ticker databases aggressively partition by day. At midnight, tomorrow's partition is mounted, and data older than 7 years is dropped instantly." },
    ],
    relatedConcepts: ["database-sharding", "database-indexing"],
    keyTakeaway: "Partitioning is local; Sharding is distributed. Use partitioning for massive time-series tables to enable partition pruning and instant data deletion.",
  },
  {
    id: "isolation-levels",
    name: "Transactions & Isolation Levels",
    categoryId: "database",
    difficulty: "advanced",
    definition:
      "Isolation levels determine how database transaction integrity is visible to other concurrent transactions. They define the tradeoff between strict data accuracy and system performance.",
    importance:
      "Improper isolation levels cause silent, catastrophic bugs (lost updates, phantom reads) in financial systems and inventory counters.",
    story:
      "You check your bank app: $100. At the exact same microsecond, Netflix charges you $15 and Spotify charges you $10. Netflix reads your balance ($100), deducts $15, saves $85. While Netflix is doing the math, Spotify reads your balance (still $100), deducts $10, saves $90. Netflix's save happens. Then Spotify's save overwrites it. Result: $90. Netflix got their money, but the bank lost $15. This is a 'Lost Update' bug caused by poor Isolation. To fix this, we use Isolation Levels. The highest level is 'Serializable': the database forces Spotify to wait in line until Netflix finishes completely. Safe, but extremely slow. Millions of users waiting in line makes the app useless. So databases offer tradeoffs: 'Read Committed' is faster but allows slight anomalies. Choosing the right isolation level is deciding exactly how much 'weird data behavior' your app can tolerate in exchange for raw speed.",
    howItWorks: [
      { title: "Read Uncommitted", description: "The fastest, most dangerous level. Your transaction can read data that another transaction has written but hasn't committed yet (Dirty Read)." },
      { title: "Read Committed", description: "(Default in Postgres/SQL Server) You only read committed data. But if you read the same row twice in one transaction, the value might change if someone else committed an update in between." },
      { title: "Repeatable Read", description: "(Default in MySQL) If you read a row, the DB locks it (or uses snapshots) so no one can change it until you finish. You will see the same data if you read twice." },
      { title: "Serializable", description: "The strictest level. Transactions act as if they run sequentially, one after another. No concurrency anomalies. Very slow." },
      { title: "Pessimistic vs Optimistic Locking", description: "Pessimistic: 'Lock the row' (SELECT FOR UPDATE). Optimistic: Let them both edit, but on save, check a version_number. If someone beat you to the save, abort and retry." },
    ],
    deepDive: [
      { title: "The Three Anomalies", content: "1. Dirty Read: Reading data that gets rolled back. 2. Non-repeatable Read: Reading row X, someone else modifies row X, you read row X again and it's different. 3. Phantom Read: You query 'Count all users > age 20' (returns 5). Someone inserts a new 21-year-old. You run the exact same query in the same transaction (returns 6). The row 'magically' appeared. Repeatable Read stops #1 and #2. Serializable stops all three." },
      { title: "MVCC (Multi-Version Concurrency Control)", content: "How do modern databases implement isolation without massive locking lockups? MVCC. When you update a row, Postgres doesn't overwrite it. It creates a NEW hidden version of the row. Your transaction sees a 'snapshot' of the data at the exact millisecond your transaction started. Other transactions see their own snapshots. Readers don't block writers, and writers don't block readers. The database cleans up old hidden versions later (Vacuuming)." },
      { title: "Lost Updates & SELECT FOR UPDATE", content: "Even in 'Read Committed', the Netflix/Spotify bug (Lost Update) happens. To fix it without going full Serializable, use a targeted lock: `SELECT balance FROM accounts WHERE id=1 FOR UPDATE;`. This tells the database: 'I am reading this specifically to update it. Do not let ANYONE else read it until I am done.' It applies a pessimistic row lock, perfectly solving the balance problem without slowing down the whole database." },
    ],
    whenToUse: [
      "Serializable: Financial ledgers, high-stakes inventory reservation (flight seats)",
      "Repeatable Read: Reporting scripts that need a consistent snapshot of the data",
      "Read Committed: Standard web app CRUD operations (95% of use cases)",
    ],
    useCases: [
      "Preventing double-booking in a ticketing system",
      "Ensuring accurate bank transfers between concurrent transactions",
      "Generating end-of-day financial reports without blocking live sales",
    ],
    tradeoffs: {
      pros: [
        "Serializable code is easy to reason about—no race conditions",
        "Strict isolation prevents catastrophic business logic failures",
      ],
      cons: [
        "Higher isolation drastically reduces database throughput (TPS)",
        "Results in frequent Deadlocks and transaction rollbacks",
        "Requires application code to handle retry logic gracefully",
      ],
    },
    realWorldExamples: [
      { company: "Stripe", description: "Maintains financial consistency by aggressively using row-level locking (SELECT FOR UPDATE) and idempotent retry patterns, rather than relying purely on global Serializable isolation." },
      { company: "MySQL InnoDB", description: "Uses Repeatable Read as the default, offering strong consistency, whereas PostgreSQL defaults to the faster Read Committed." },
    ],
    relatedConcepts: ["cap-theorem", "sql-vs-nosql"],
    keyTakeaway: "Understand anomalies. Use 'Read Committed' by default, but manually apply 'SELECT FOR UPDATE' locks on rows involving money or inventory.",
  },
  
  // ═══════════════════════════════════════
  // CACHING EXPANDED
  // ═══════════════════════════════════════
  {
    id: "cache-policies",
    name: "Cache Eviction & Write Policies",
    categoryId: "caching",
    difficulty: "advanced",
    definition:
      "Write policies define how data is written to the cache and DB (Write-Through, Write-Back). Eviction policies define which data is removed when the cache is full (LRU, LFU).",
    importance:
      "A cache with the wrong eviction policy stores useless data. A cache with the wrong write policy either loses data or slows down writes.",
    story:
      "Your Redis server has 10GB of RAM. It fills up. A new request comes in to cache the trending news article. Redis must delete something to make room. But what? If it chooses randomly, it might delete the homepage cache. If it uses FIFO (First In, First Out), it deletes whatever was inserted longest ago—which might be the homepage! You need an Eviction Policy. LRU (Least Recently Used) is the industry standard: it deletes the item that hasn't been requested in the longest amount of time. It assumes 'if nobody asked for this recently, they probably won't ask again soon.' But what if a crawler scans your entire archive of old articles? The crawler touches millions of old items, pushing out all your popular items! LRU gets poisoned. To solve this, you use LFU (Least Frequently Used)—evict the item with the lowest hit count. Or Segmented LRU, which requires an item to be requested twice before moving into the 'protected' high-value cache.",
    howItWorks: [
      { title: "LRU (Least Recently Used)", description: "Maintains a linked list. Every time an item is accessed, it moves to the Head. When full, drop the Tail. Great default." },
      { title: "LFU (Least Frequently Used)", description: "Tracks access frequency (count). Drops items with the lowest count. Resilient to cache-poisoning scans, but requires more memory for counters." },
      { title: "Segmented LRU (SLRU)", description: "Splits cache into 'Probation' and 'Protected'. New items go to Probation. If accessed again, they promote to Protected. Prevents one-time scans from purging popular data." },
      { title: "Write-Through", description: "App writes to Cache AND Database synchronously. Safe, consistent, but write latency is equal to Cache + DB time." },
      { title: "Write-Back (Write-Behind)", description: "App writes ONLY to Cache. Cache ACKs immediately. A background job later writes cache data to the DB. Blazing fast writes, but data loss risk if Cache crashes." },
    ],
    deepDive: [
      { title: "Redis allkeys-lru vs volatile-lru", content: "Redis gives you granular control. `allkeys-lru` will evict ANY key using LRU when memory is full. `volatile-lru` will ONLY evict keys that have an explicit TTL (expiration) set. If you use Redis for both Caching (volatile) and Primary Data like Sessions (no TTL), `allkeys-lru` is disastrous because it will delete active user sessions to make room for a cached database query." },
      { title: "The LFU Aging Problem", content: "LFU tracks frequency. Say an article goes viral for 2 days. Its counter hits 5,000,000. Then the trend ends. Nobody reads it. Under pure LFU, this article will NEVER be evicted, because everyday normal items only reach counts of 1,000. The dead trend clogs the cache forever. Solution: LFU with Aging. The cache periodically halves all counters, ensuring that recency is factored in, not just absolute historical frequency." },
      { title: "Write-Around Policy", content: "App writes directly to the Database, bypassing the Cache entirely. The Cache is only populated on a Read miss (Lazy Loading). Why? If your app ingests massive amounts of data (logs, IoT metrics) that are rarely read immediately, Write-Through or Write-Back pollutes the cache with useless data. Write-Around prevents cache-pollution by write-heavy workloads." },
    ],
    whenToUse: [
      "Use LRU for general purpose web content caching",
      "Use LFU / SLRU if you are targeted by web crawlers or have heavy long-tail reads",
      "Use Write-Back for extremely write-heavy paths where eventual consistency is acceptable (e.g., YouTube view counters)",
    ],
    useCases: [
      "Configuring Redis maxmemory-policy in production",
      "High-speed ingestion engines using Write-Back caching",
      "CDN edge nodes using SLRU to protect popular assets",
    ],
    tradeoffs: {
      pros: [
        "LRU is easy to implement and highly effective for normally distributed traffic",
        "Write-Back dramatically hides database write latency",
      ],
      cons: [
        "LRU is vulnerable to sequential scan cache poisoning",
        "LFU requires overhead for maintaining frequency counters",
        "Write-Back risks total data loss if the cache server experiences a power failure",
      ],
    },
    realWorldExamples: [
      { company: "Redis", description: "Defaults to `noeviction` (which returns errors when full!). Developers must explicitly configure `allkeys-lru` or advanced policies like LFU." },
      { company: "Linux Page Cache", description: "The OS uses a variant of Segmented LRU to manage swapping RAM to disk, preventing large file backups from pushing active applications out of memory." },
    ],
    relatedConcepts: ["caching-strategies", "redis-memcached"],
    keyTakeaway: "LRU is vulnerable to sequential scans. If you have crawlers, look into LFU. If latency is paramount and data loss acceptable, use Write-Back.",
  },
  // ═══════════════════════════════════════
  // NETWORKING EXPANDED
  // ═══════════════════════════════════════
  {
    id: "networking-protocols",
    name: "TCP vs UDP & Real-time Protocols",
    categoryId: "networking",
    difficulty: "intermediate",
    definition:
      "TCP is reliable, ordered, and connection-oriented. UDP is fast, unreliable, and connectionless. Real-time web protocols (WebSockets, SSE) build on top of these base layers.",
    importance:
      "Choosing the right transport and application protocols dictates the latency, battery drain, and real-time capabilities of your application.",
    story:
      "TCP is like sending certified mail. You send a package, the post office tracks it at every stop, the recipient signs for it, and sends you a receipt. If the package gets lost, you resend it. You are mathematically guaranteed it arrived in perfect condition. But all this signing and returning receipts takes time. UDP is like throwing a message in a bottle into a river. You throw it. You hope it arrives. If it sinks, you don't know and you don't text. Why would anyone use UDP? Because it's INSTANT. If you're on a Zoom call and packet #100 (a frame of video) drops, do you want Zoom to pause the video for 3 seconds to fetch packet #100, or do you want it to just skip to packet #101? You want it to skip. Live video, online gaming, and VoIP use UDP. File downloads, web browsing, and emails use TCP. On top of TCP, we built HTTP. But HTTP is request-response only—the server can't talk to the client unless asked. So we invented WebSockets (bi-directional, persistent TCP) and Server-Sent Events (SSE) (unidirectional push over HTTP).",
    howItWorks: [
      { title: "TCP (Transmission Control Protocol)", description: "Performs a 3-way handshake. Acknowledges every packet. Guarantees ordering and delivery. Reduces speed to prevent network congestion." },
      { title: "UDP (User Datagram Protocol)", description: "No handshake, no acknowledgments. Just blasts packets at an IP address. Extremely low latency, but packets can be lost or arrive out of order." },
      { title: "Long Polling (HTTP Hack)", description: "Client asks server 'Any updates?'. Server holds the connection open until it has an update, sends it, and the client immediately asks again." },
      { title: "WebSockets", description: "Client upgrades an HTTP connection to a WebSocket. The connection stays open indefinitely. Both client and server can push messages instantly." },
      { title: "Server-Sent Events (SSE)", description: "Standard HTTP connection kept open. Only the Server can push data to the Client (unidirectional). Perfect for live feeds or progress bars." },
    ],
    deepDive: [
      { title: "The Head-of-Line Blocking Problem", content: "TCP guarantees order. If you send packets A, B, and C, and packet A is lost, the operating system holds B and C hostage. It will NOT deliver them to the application until A is re-requested and arrives. This is 'Head of Line Blocking.' A single dropped packet pauses the entire data stream. This makes TCP terrible for real-time multiplayer gaming, where stale position data (packet A) is useless anyway." },
      { title: "WebSockets vs Server-Sent Events", content: "Everyone defaults to WebSockets for real-time. But WebSockets are complex: they require stateful load balancers, don't automatically reconnect, and bypass HTTP/2 multiplexing. If you only need the Server to push to the Client (like live sports scores, stock tickers, or ChatGPT typing out answers), use SSE. SSE is just standard HTTP. It works with standard caching, automatically reconnects natively, and leverages HTTP/2. Use WebSockets only if the Client ALSO needs to push high-frequency data (chat apps, games)." },
      { title: "QUIC and HTTP/3", content: "Google created QUIC to solve TCP's Head-of-Line blocking. QUIC is built on top of UDP! It implements its own reliability in software rather than relying on the OS's TCP stack. HTTP/3 runs on QUIC. It provides encrypted (TLS 1.3 is built-in), reliable streams over UDP without Head-of-Line blocking. It is the future of the web." },
    ],
    whenToUse: [
      "UDP: Multiplayer gaming (FPS/MOBAs), VoIP, Video Streaming, Statsd metric ingestion",
      "TCP: Everything else (HTTP, Database connections, SSH)",
      "WebSockets: Two-way real-time apps (Chat, collaborative drawing boards)",
      "SSE: One-way live feeds (Stock tickers, LLM streaming responses, notifications)",
    ],
    useCases: [
      "Zoom using UDP for voice/video transmission",
      "Discord using WebSockets for live chat",
      "ChatGPT using Server-Sent Events to stream generated tokens",
    ],
    tradeoffs: {
      pros: [
        "TCP ensures perfect data integrity and handles congestion tracking",
        "UDP provides raw, uninhibited speed",
        "WebSockets provide sub-10ms bi-directional communication",
      ],
      cons: [
        "TCP adds latency via handshakes and Head-of-Line blocking",
        "UDP puts the burden of handling packet loss entirely on the app developer",
        "Persistent connections (WebSockets) make load balancing and scaling stateful and difficult",
      ],
    },
    realWorldExamples: [
      { company: "Discord", description: "Uses WebSockets heavily for the text chat platform, allowing bidirectional real-time communication between the client and gateway servers." },
      { company: "YouTube Live / Twitch", description: "Often rely on video streaming protocols like WebRTC (built on UDP) for low-latency live streaming, falling back to TCP (HLS) for general broadcasting." },
    ],
    relatedConcepts: ["how-internet-works"],
    keyTakeaway: "Match the protocol to the need: TCP for accuracy, UDP for speed, WebSockets for two-way real-time, SSE for server-push.",
  },
  {
    id: "forward-proxy",
    name: "Forward Proxy vs Reverse Proxy",
    categoryId: "networking",
    difficulty: "beginner",
    definition:
      "A Forward Proxy sits in front of a client and acts on its behalf to access the internet. A Reverse Proxy sits in front of a server and protects it from the internet.",
    importance:
      "Proxies control the flow of traffic. Mixing up their roles leads to serious security and architectural misunderstandings.",
    story:
      "Imagine a high security prison. The inmates (clients) want to order books from the outside world. They aren't allowed to interact with the mailman directly. So, an inmate gives their request to the Prison Guard (Forward Proxy). The Guard checks if the book is allowed (content filtering), goes outside, buys the book, and gives it to the inmate. To the bookstore, the Guard bought the book. The bookstore has no idea which inmate it's for, or even that it's for an inmate at all. Anonymity and control for the clients. Now imagine bringing a Celebrity (server) to a book signing. The Celebrity doesn't want thousands of angry fans touching them directly. They hire a Bodyguard (Reverse Proxy). Fans talk to the Bodyguard. The Bodyguard checks if they have a ticket (authentication), takes their book, turns around, has the Celebrity sign it, and hands it back. The fans never interact with the Celebrity directly. Protection and load management for the server.",
    howItWorks: [
      { title: "Forward Proxy", description: "The Client configures its OS/Browser to point to the Proxy. Client asks Proxy: 'Get google.com for me'. Proxy fetches it." },
      { title: "Reverse Proxy", description: "The Client asks DNS for yoursite.com. DNS points to the Proxy. The Proxy secretly forwards the request to your backend server." },
      { title: "Forward Proxy Goal", description: "Protect, anonymize, or restrict the CLIENT. (e.g., Corporate firewall blocking social media, or a VPN hiding your IP)." },
      { title: "Reverse Proxy Goal", description: "Protect, load balance, and cache for the SERVER. (e.g., Nginx distributing traffic to 5 backend Node.js apps)." },
    ],
    deepDive: [
      { title: "VPNs as Forward Proxies", content: "A Virtual Private Network (VPN) acts as an encrypted Forward Proxy. When you use ExpressVPN, you route all your traffic to their server. The target website (Netflix, Google) only sees the VPN's IP address. It has no idea who the real client is. This provides client anonymity." },
      { title: "Scraping & Residential Proxies", content: "Web scrapers use massive pools of Forward Proxies. If a scraper hits a site 1,000 times from one IP, a Reverse Proxy (like Cloudflare) will block it. So the scraper buys a pool of 10,000 'Residential Proxies' (forward proxies running on hacked smart TVs or legitimate home networks). The requests loop through these forward proxies, appearing to the target server as 10,000 different real humans." },
    ],
    whenToUse: [
      "Use Forward Proxy for: Corporate network filtering, IP anonymization, Web Scraping",
      "Use Reverse Proxy for: Load balancing, SSL termination, Caching, DDoS protection (Cloudflare)",
    ],
    useCases: [
      "Corporate IT forcing all employee traffic through a Squid Forward Proxy to block reddit.com",
      "A developer using Nginx (Reverse Proxy) to host a React app and an API on the same domain",
    ],
    tradeoffs: {
      pros: [
        "Forward Proxies provide anonymity and centralized client egress control",
        "Reverse Proxies hide server topology and offload expensive tasks (SSL/Compression)",
      ],
      cons: [
        "Proxies introduce a man-in-the-middle, requiring trust",
        "Proxies add a network hop, introducing slight latency",
      ],
    },
    realWorldExamples: [
      { company: "Cloudflare", description: "The world's most famous Reverse Proxy. It absorbs DDoS attacks at the edge so malicious traffic never even reaches your actual servers." },
      { company: "Squid Cache", description: "A highly popular open-source Forward Proxy used by corporations worldwide to cache web pages and enforce browsing policies for employees." },
    ],
    relatedConcepts: ["reverse-proxy", "api-gateway"],
    keyTakeaway: "Forward proxy acts on behalf of the Client. Reverse proxy acts on behalf of the Server.",
  },

  // ═══════════════════════════════════════
  // ARCHITECTURE & TRADEOFFS
  // ═══════════════════════════════════════
  {
    id: "push-vs-pull",
    name: "Push vs Pull Architecture",
    categoryId: "tradeoffs",
    difficulty: "intermediate",
    definition:
      "In Push (reactive), the producer sends data instantly to consumers. In Pull (polling), the consumer requests data from the producer on a schedule.",
    importance:
      "This dictates system resource usage. Heavy Push wastes CPU if consumers are slow; heavy Pull wastes network bandwidth with empty requests.",
    story:
      "Imagine you're waiting for an important package. Pull Architecture: You walk to the mailbox every 15 minutes. Open it. Empty. Walk back. 15 minutes later, check again. Empty. You waste immense amounts of your energy, but the Post Office does no extra work. Push Architecture: You stay on your couch. When the package arrives, the Mailman rings your doorbell. Highly efficient for you! But now the Post Office has to maintain a directory of every doorbell and actively notify people. What if you aren't home? Does the mailman wait? Does he keep ringing? In system design, Twitter timelines are Pull based. With 300 million users, pushing every single tweet instantly to the timelines of millions of followers would destroy servers. Users just 'Pull' their feed when they open the app. Chat applications (WhatsApp), however, are Push based. A message sits in the server holding a WebSocket open, instantly 'ringing the doorbell' of the recipient's phone.",
    howItWorks: [
      { title: "Pull Method (Polling)", description: "Consumer: 'Give me data'. Producer: 'Here is data'. The consumer drives the cadence. Easiest to implement (Standard HTTP)." },
      { title: "Push Method", description: "Producer: 'Hey consumer, here is new data!'. Consumer must be listening (Webhooks, WebSockets, SSE)." },
      { title: "Long Polling (Hybrid)", description: "Consumer: 'Give me data'. Producer: 'I have none, but I will hold this connection open until I do.' Mimics Push using Pull tech." },
      { title: "Event Streaming (Kafka)", description: "Producer Pushes to a broker. Consumer Pulls from the broker at its own speed. The perfect middle ground." },
    ],
    deepDive: [
      { title: "The Celebrity Problem (Fan-out on Write vs Read)", content: "Justin Bieber has 100M followers. If Twitter uses Push (Fan-out on Write), when he tweets, Twitter must execute 100,000,000 database inserts into the timelines of his followers instantly. This writes-amplification crashes systems. So Twitter uses Pull (Fan-out on Read) for celebrities. Bieber's tweet goes into one global table. When you open your app (Pull), Twitter dynamically checks your subscriptions, grabs his tweet, and merges it into your feed." },
      { title: "Rate Limits and Backpressure", content: "In a pure Push system, if the producer generates 1000 msgs/sec and the consumer can only process 100 msgs/sec, the consumer gets overwhelmed and crashes (OOM). This requires 'Backpressure' (the consumer yelling 'SLOW DOWN!'). In a Pull system, backpressure is natural: the consumer just pulls 100 msgs/sec. It dictates its own pace." },
    ],
    whenToUse: [
      "Use Pull: when clients are mostly offline, when generating data is cheaper than delivering it, or when clients have vastly different processing speeds.",
      "Use Push: for low-latency real-time applications (Chat, Live collaboration, Trading systems).",
    ],
    useCases: [
      "Pull: Checking an email inbox using POP3/IMAP, scraping metrics via Prometheus",
      "Push: Receiving a Slack message, GitHub Webhooks notifying your CI/CD pipeline",
    ],
    tradeoffs: {
      pros: [
        "Pull provides natural backpressure and handles offline clients easily",
        "Push provides absolute minimum latency and eliminates wasted network calls",
      ],
      cons: [
        "Pull wastes massive resources checking for updates when nothing has changed",
        "Push requires complex persistent connection management and state tracking",
      ],
    },
    realWorldExamples: [
      { company: "Prometheus Monitoring", description: "Uses a pure Pull model. Prometheus crawls (scrapes) /metrics endpoints of microservices every 15s. This prevents monitoring from overwhelming dying services with push traffic." },
      { company: "Stripe Webhooks", description: "Uses a Push model. When a payment completes, Stripe initiates an HTTP POST request to your server to notify you instantly." },
    ],
    relatedConcepts: ["networking-protocols", "event-streaming"],
    keyTakeaway: "Pull protects the consumer (controls pace). Push optimizes latency. Use Message Queues to get the best of both.",
  },
  {
    id: "serverless-vs-serverful",
    name: "Serverless vs Serverful",
    categoryId: "architecture",
    difficulty: "beginner",
    definition:
      "Serverful (VMs, Containers) requires provisioning and managing underlying infrastructure. Serverless (AWS Lambda) abstracts servers entirely, charging only for exact execution time.",
    importance:
      "Serverless redefines operational costs. It shifts the burden of scaling and infrastructure maintenance entirely to the cloud provider.",
    story:
      "Serverful is like owning a car. You pay for it 24/7, whether you are driving it or it's asleep in the garage. You have to change the oil (OS updates), put gas in it (monitor CPU), and if you need to drive 50 people, your 5-seater car simply can't do it. But when you want to drive, the keys are in the ignition—instant response. Serverless is like taking an Uber. You don't own the car. You don't do maintenance. You only pay for the exact minutes you are in the vehicle. If you suddenly need to move 50 people, you just hit a button and 10 Ubers show up simultaneously (infinite auto-scale). The catch? When you order an Uber, you might have to wait 3 minutes for it to arrive. This is the 'Cold Start'. And if you are taking Ubers for 14 hours a day, every single day, you will realize that owning a car would have been vastly cheaper.",
    howItWorks: [
      { title: "Serverful (EC2/K8s)", description: "Provision an instance. Deploy app. Keep process running. Scale by adding more instances manually or via auto-scaler." },
      { title: "Serverless Trigger", description: "Define an event (HTTP request, file upload to S3, database change) that maps to a function." },
      { title: "Container Instantiation (Cold Start)", description: "When the event happens, the cloud provider spins up a micro-container, loads your code, and runs it." },
      { title: "Execution & Billing", description: "The function executes. You are billed in 1-millisecond increments of memory/CPU used. When done, it goes to 'sleep'." },
      { title: "Scale to Zero", description: "If there are zero requests for an hour, zero containers run. Your AWS bill for that hour is $0.00." },
    ],
    deepDive: [
      { title: "The Cold Start Problem", content: "When a Serverless function hasn't been used in 10 minutes, the cloud provider tears down the container. The next request triggers a 'Cold Start': provision container -> load runtime (Node/Python/Java) -> run code. This can take 1 to 5 seconds. For background jobs, 5 seconds doesn't matter. For user-facing APIs, a 5-second delay feels broken. Solutions: 'Provisioned Concurrency' (paying to keep warm functions) or writing functions in Rust/Go (sub-100ms cold starts)." },
      { title: "State & Persistence", content: "Serverless functions are fundamentally stateless. You cannot store variables in memory and expect them to be there for the next request, because the next request might route to a completely different container. All state MUST be externalized to a database (DynamoDB) or cache (Redis)." },
      { title: "The Cost Crossover Point", content: "Serverless is cheap for spiky traffic or side projects. But Lambda is expensive per-CPU-cycle compared to EC2. If you have a constant, steady load of 1,000 requests per second, running Serverless will cost thousands of dollars, whereas a few EC2 servers running Docker would cost $100. Serverless optimizes for engineering time, not sheer compute cost." },
    ],
    whenToUse: [
      "Serverless: Spiky, unpredictable workloads, CRON jobs, event-driven glue code (image resizing, webhook handlers)",
      "Serverful: Consistent high-throughput traffic, stateful applications (WebSockets), ultra-low latency requirements",
    ],
    useCases: [
      "Serverless: An e-commerce site handling a sudden 100x traffic spike on Black Friday natively without ops intervention",
      "Serverful: A high-frequency trading platform where 50ms of network latency is unacceptable",
    ],
    tradeoffs: {
      pros: [
        "Serverless eliminates DevOps maintenance (OS patching, auto-scaling rules)",
        "Perfect cost efficiency for low-traffic tasks (Scale to Zero)",
        "Massive, instantaneous horizontal scaling",
      ],
      cons: [
        "Cold starts degrade P99 latency for user-facing APIs",
        "Vendor lock-in (AWS Lambda code ties closely to AWS API Gateway/IAM)",
        "Extremely expensive for sustained, high-throughput constant loads",
      ],
    },
    realWorldExamples: [
      { company: "A Cloud Guru", description: "Built an immense online learning platform completely Serverless (AWS Lambda, API Gateway, DynamoDB), achieving massive scale with almost zero ops team." },
      { company: "Prime Video (Amazon)", description: "Famously migrated a serverless microservice back to a serverful monolith (ECS/EC2), reducing their AWS infrastructure costs by 90% because their stream monitoring had constant, heavy, predictable load." },
    ],
    relatedConcepts: ["microservices", "auto-scaling"],
    keyTakeaway: "Use Serverless to save DevOps time and handle spiky/low traffic. Move to Serverful if you have constant high load or strict latency requirements.",
  },
  // ═══════════════════════════════════════
  // SECURITY
  // ═══════════════════════════════════════
  {
    id: "sso-saml-oidc",
    name: "SSO (SAML & OIDC)",
    categoryId: "security",
    difficulty: "intermediate",
    definition:
      "Single Sign-On (SSO) allows a user to log in once to a central identity provider and access multiple independent applications without re-authenticating.",
    importance:
      "Essential for enterprise SaaS. Big companies will not buy your software unless it integrates with their central identity system (Okta, Azure AD).",
    story:
      "Imagine working at a huge corporation with 50 different internal apps (HR portal, Jira, Slack, Salesforce, internal tools). If you had to create, memorize, and rotate 50 different passwords, you'd go crazy. If you get fired, the IT department has to remember to go to 50 different dashboards to delete your accounts before you steal data. Single Sign-On solves this. The company buys Okta (an Identity Provider). You log into Okta exactly once in the morning. Okta gives your browser a universal badge. Now you open Salesforce. Salesforce says, 'I don't know you, go talk to Okta.' Okta sees your badge, tells Salesforce 'He's good, his name is John, let him in.' You are instantly logged in. When John gets fired, IT deletes his Okta account. He instantly loses access to all 50 apps simultaneously. This magic is powered by two main protocols: SAML (the old enterprise workhorse using XML) and OIDC (the modern web standard using OAuth2 and JSON).",
    howItWorks: [
      { title: "User accesses Service Provider (SP)", description: "John opens Salesforce (the app). Salesforce sees he isn't logged in." },
      { title: "Redirect to Identity Provider (IdP)", description: "Salesforce redirects John to Okta (the central authority) with a login request." },
      { title: "Auth at IdP", description: "John enters his password/2FA directly on Okta's site. Salesforce never sees his password." },
      { title: "Token Generation", description: "Okta creates an assertion (SAML XML) or token (OIDC JWT) signed with Okta's private key, proving John's identity." },
      { title: "Callback to SP", description: "John is redirected back to Salesforce. Salesforce verifies Okta's signature against Okta's public key, reads 'User=John', and logs him in." },
    ],
    deepDive: [
      { title: "SAML vs OIDC", content: "SAML (Security Assertion Markup Language) is XML-based. It is heavy, complex, and terrible for mobile apps, but heavily entrenched in older enterprises, healthcare, and banking. OIDC (OpenID Connect) is modern. It is an identity layer built on top of OAuth 2.0. It uses JSON Web Tokens (JWTs) instead of massive XML blobs. 'Sign in with Google' uses OIDC. If you are building a new B2B app, offer OIDC first, but know that Fortune 500s will eventually demand SAML." },
      { title: "JIT (Just-in-Time) Provisioning", content: "When John logs into your SaaS via Okta for the first time, your database has no record of 'John'. Instead of forcing the IT admin to manually create John's account in your app beforehand, JIT uses the data in the SSO payload. The SAML/OIDC token includes `email=john@co.com, role=Sales`. Your app reads this, dynamically creates his user row in the database, and logs him in instantly." },
      { title: "SCIM (Cross-Domain Identity Management)", content: "SSO handles logging in. But what about groups mapping? SCIM is an API standard. When IT changes John's title from 'Junior' to 'Manager' in Okta, Okta automatically sends a SCIM API request in the background to Salesforce, Slack, and Jira, updating his permissions everywhere before he even logs in again." },
    ],
    whenToUse: [
      "When selling B2B SaaS to enterprise companies",
      "When managing internal tools across a large engineering org",
      "When implementing strict offboarding security compliance",
    ],
    useCases: [
      "Integrating your SaaS app with Azure AD or Google Workspace",
      "'Sign in with Apple' or 'Sign in with Google' for consumers",
    ],
    tradeoffs: {
      pros: [
        "Massive UX improvement for users (fewer passwords)",
        "Crucial security for enterprises (centralized offboarding, enforced 2FA)",
      ],
      cons: [
        "SAML integration is notoriously painful to debug (XML signature errors)",
        "Identity Provider downtime takes down access to all downstream applications",
      ],
    },
    realWorldExamples: [
      { company: "Okta / Auth0", description: "The industry leaders in providing cloud Identity-as-a-Service, allowing companies to federate authentication across thousands of isolated vendors." },
      { company: "B2B SaaS 'SSO Tax'", description: "Because SSO is critical for enterprises but complex to build, SaaS companies famously lock SSO behind their most expensive 'Enterprise' pricing tiers." },
    ],
    relatedConcepts: ["oauth-jwt", "authorization-acl-rbac"],
    keyTakeaway: "SSO centralizes trust. Build OIDC for modern apps, but prepare for SAML if selling to massive enterprises.",
  },
  {
    id: "authorization-acl-rbac",
    name: "Authorization: RBAC vs ABAC vs ACL",
    categoryId: "security",
    difficulty: "intermediate",
    definition:
      "Authentication verifies WHO you are. Authorization verifies WHAT you are allowed to do. RBAC uses Roles, ACL uses explicit Lists, ABAC uses dynamic Rules.",
    importance:
      "Poor authorization design leads to Privilege Escalation bugs (e.g., a junior user editing an admin's profile) or unmaintainable spaghetticode.",
    story:
      "You build a simple blog. User A is an 'Admin'. User B is a 'Reader'. This is Role-Based Access Control (RBAC). It's simple. Admin can edit, Reader can only read. But then you add a new feature: Authors can only edit THEIR OWN posts. Now RBAC is broken. User C is an 'Author', but should they edit Post #5? Yes if they wrote it, no if they didn't. You need finer control. You use an Access Control List (ACL): you attach a list directly to Post #5: [Bob=Edit, Alice=Read]. That works, but mapping millions of users to millions of posts is a database nightmare. So you evolve to Attribute-Based Access Control (ABAC), also known as a Rule Engine. Instead of lists, you write Policy Rules: `Allow Edit IF User.Role == Author AND User.ID == Post.AuthorID AND Time < 5PM`. Now the system checks the dynamic 'attributes' of the user, the resource, and the environment at the exact moment of request. This is how complex enterprise products govern data.",
    howItWorks: [
      { title: "ACL (Access Control List)", description: "Direct mapping. Table: `DocId=5, UserId=99, Permission=Write`. Good for bespoke sharing (Google Docs \"Share with User X\")." },
      { title: "RBAC (Role-Based Access Control)", description: "Users are assigned Roles (Admin, Editor, Viewer). Roles are granted Permissions. Clean, coarse-grained, industry standard." },
      { title: "ABAC (Attribute-Based Access Control)", description: "Permissions evaluated dynamically based on User traits (Department=HR), Resource traits (DocumentSensitivity=TopSecret), and Context (IP=InternalNet)." },
      { title: "Rule Engine Evaluation", description: "A central policy engine (like OPA or AWS IAM) takes the incoming request, evaluates all JSON rules, and returns a binary ALLOW or DENY." },
    ],
    deepDive: [
      { title: "The RBAC Explosion", content: "RBAC is great until it isn't. A hospital uses RBAC: 'Doctor' role can view patient records. But wait, a Doctor shouldn't view ALL patients—only their own. So you create 'Doctor_WardA', 'Doctor_WardB'. Wait, doctors covering night shifts need cross-ward access. So you create 'Doctor_WardA_NightShift'. Suddenly you have 5,000 distinct Roles for 2,000 employees. This is called 'Role Explosion'. This is the exact indicator that you need to move from RBAC to ABAC." },
      { title: "Google Docs: ACL at Scale", content: "Google Docs uses ACLs. When you click 'Share' and type an email, you update the ACL. But evaluating ACLs for millions of files is too slow for databases. Google solved this with 'Zanzibar', a globally distributed graph database built specifically to answer one question instantly: 'Does User X have Permission Y on Object Z?'. It traverses massive graph relationships (User X is in Group G, which is in Folder F, which contains Doc Z) in sub 10ms." },
      { title: "Open Policy Agent (OPA)", content: "Rather than hardcoding authorization logic (e.g., `if (user.role === 'admin')`) in every microservice, modern architectures use OPA. OPA is a sidecar container running next to your app. Your app sends JSON to OPA: \"User is Bob, Resource is Post5, Action is Delete. Allowed?\" OPA executes rules written in a policy language (Rego) and returns true/false. Marketing, HR, and Eng can all share the same centralized policy repo." },
    ],
    whenToUse: [
      "RBAC: For 80% of B2B SaaS apps assigning standard roles (Admin/Member/Billing)",
      "ACL: For user-driven explicit sharing (Dropbox, Google Drive)",
      "ABAC: For complex, compliance-heavy, conditional environments (Banking, Healthcare, AWS IAM)",
    ],
    useCases: [
      "AWS IAM Policies (A pure ABAC engine)",
      "Firebase Security Rules (ABAC tied to database attributes)",
      "Discord server permissions (Advanced RBAC)",
    ],
    tradeoffs: {
      pros: [
        "RBAC is easy for end-users to understand and assign",
        "ABAC handles infinitely complex edge cases without bloating",
      ],
      cons: [
        "ACLs require massive database JOINs to scale globally",
        "ABAC debugging is notoriously difficult (e.g., 'Why did this AWS IAM policy fail?')",
      ],
    },
    realWorldExamples: [
      { company: "AWS IAM", description: "The most famous implementation of ABAC. JSON policies define access based on tags, IP addresses, MFA presence, and resource types." },
      { company: "Authzed / SpiceDB", description: "Open-source implementations inspired by Google's Zanzibar paper, offering scalable ACL/Graph-based authorization as a service." },
    ],
    relatedConcepts: ["oauth-jwt"],
    keyTakeaway: "Start with RBAC. When Role Explosion occurs, graduate to ABAC using a dedicated policy engine.",
  },

  // ═══════════════════════════════════════
  // RELIABILITY & ARCHITECTURE
  // ═══════════════════════════════════════
  {
    id: "migrating-to-microservices",
    name: "Migrating to Microservices",
    categoryId: "architecture",
    difficulty: "advanced",
    definition:
      "The process of breaking a tightly coupled Monolithic application into independent Microservices safely, using patterns like Strangler Fig and Event-driven CDC.",
    importance:
      "A failed rewrite (the 'Big Bang') destroys companies. Safe, incremental abstraction is the only way to evolve architecture.",
    story:
      "You have a giant 5-year-old Ruby on Rails monolith. It's too slow. You want to rewrite it in Go Microservices. The instinct is to say: 'Pause all product development for 6 months. We'll rebuild it from scratch.' This is the 'Big Bang Rewrite', and it has killed countless engineering teams, including Netscape. In those 6 months, competitors steal your market, and when you finally launch the rewrite, it lacks hidden bugfixes that were in the legacy code. You must use the 'Strangler Fig Pattern'. You put an API Gateway in front of your monolith. You build ONE microservice in Go (e.g., the 'Billing' service). You tell the Gateway: 'Route /api/billing to the new Go service. Route EVERYTHING ELSE to the old Ruby Monolith.' You have successfully extracted one piece. It's live. You check if it breaks. The next month, you extract 'Search'. The next month, 'User Profiles'. Over two years, the new services slowly grow around the old monolith until the monolith handles 0% of traffic. You turn it off. You evolved the system without ever stopping the car.",
    howItWorks: [
      { title: "Identify the Seam", description: "Find a cleanly bounded context in the monolith (e.g., the Email sending module) that doesn't share heavy database JOINs with the rest of the app." },
      { title: "Install API Gateway", description: "Route all public traffic through a gateway like Nginx or Kong, initially pointing 100% to the monolithic app." },
      { title: "Build the Microservice", description: "Write the new service alongside the monolith. Give it its own database." },
      { title: "Data Sync / CDC", description: "Use Change Data Capture (Debezium/Kafka) to sync the monolith's legacy database to the new microservice's database." },
      { title: "Cutover (Strangler Pattern)", description: "Configure the API Gateway to route specific requests to the new service instead of the monolith. If it fails, revert the router instantly." },
    ],
    deepDive: [
      { title: "The Shared Database Anti-Pattern", content: "The biggest mistake in microservice migration is extracting the code but leaving the database shared. Service A (Ruby) and Service B (Go) both connecting to `main_db`. Now, if Service A alters a table schema, Service B crashes. You haven't decoupled anything; you've just created a 'Distributed Monolith' with network latency added. The database must be split. This requires massive effort in backfilling data and replacing SQL JOINs with API calls." },
      { title: "Anti-Corruption Layers (ACL)", content: "When a pristine, modern new microservice needs to talk to the horrific legacy monolith, don't let legacy data structures pollute the new code. Build a translation layer. The ACL intercepts calls from the new service, formats them into the ugly legacy structure the monolith expects, and vice-versa. When the monolith is eventually killed, you just delete the ACL. The new service's core domain model stays clean." },
      { title: "Feature Flags for Migration", content: "Routing at the API gateway is coarse. Feature flags provide surgical precision. You can encode logic: 'If the customer is internal staff, route their checkout to the new Microservice. If it's a real customer, use the monolith.' Once staff verify the new service is bug-free, change the flag to 10% of real users. Then 50%. Then 100%. If metrics spike at 50%, dial it back to 10% instantly." },
    ],
    whenToUse: [
      "When a monolith's deployment time exceeds acceptable limits (e.g., > 1 hour CI/CD)",
      "When different teams are consistently blocking each other trying to merge code",
      "When a specific feature (like video-encoding) needs massive scaling but the rest of the app doesn't",
    ],
    useCases: [
      "Strangling a legacy C# backend into a modern Node/Go K8s cluster",
      "Isolating a brittle legacy payment system behind an API to protect the rest of the app",
    ],
    tradeoffs: {
      pros: [
        "Allows iterative, zero-downtime modernization",
        "Provides immediate value (extracting the worst bottleneck first)",
        "Reversible: If the new service fails, route back to the monolith",
      ],
      cons: [
        "Requires maintaining two systems and mapping between them simultaneously",
        "Data synchronization between legacy and modern DBs is notoriously complex",
        "Adds the latency overhead of API Gateways and microservice hops",
      ],
    },
    realWorldExamples: [
      { company: "Martin Fowler", description: "Coined the term 'Strangler Fig Pattern' after observing strangler figs in Australia that seed in the upper branches of a tree, grow down to the ground, and eventually kill the host tree." },
      { company: "Uber", description: "Moved from a single monolithic Postgres database and Python app to thousands of microservices, heavily utilizing CDC and incremental routing to survive." },
    ],
    relatedConcepts: ["microservices", "api-gateway"],
    keyTakeaway: "Never do a 'Big Bang' rewrite. Incrementally strangle the monolith piece by piece using an API Gateway and isolated databases.",
  },
  {
    id: "monitoring-and-logging",
    name: "Logging & Centralized Monitoring",
    categoryId: "reliability",
    difficulty: "beginner",
    definition:
      "Logging is the permanent record of discrete events. Monitoring is the aggregation of metrics over time. Centralization ensures that data from 1,000 servers is searchable in one place.",
    importance:
      "Without centralized logging, debugging a distributed system is impossible. You cannot SSH into 100 containers to read text files.",
    story:
      "It's 2010. A user complains they can't checkout. You SSH into `web-server-1`. You run `tail -f /var/log/nginx.log`. You see nothing. You SSH into `web-server-2`. Nothing. By the time you check `web-server-8`, the user has left. It's 2024. A user complains they can't checkout. You don't SSH into anything. You open Kibana (or Datadog). You type `user_id: 12345`. Instantly, you see their HTTP request hit the Gateway. You see the Gateway call the Order Service. You see the Order Service log: `Failed to connect to Inventory DB`. You see the exact stack trace. You found the bug in 8 seconds. This is the ELK stack (Elasticsearch, Logstash, Kibana). Your 100 servers never write logs to local disk. They stream structured JSON logs to a central pipeline. The logs are indexed like a search engine. When a system spans multiple borders, Centralized Logging is the only map you have.",
    howItWorks: [
      { title: "Structured Logging (JSON)", description: "Instead of printing `User 123 failed login`, the app prints `{\"event\": \"login_fail\", \"user\": 123, \"ip\": \"1.1.1.1\"}`. This allows querying by field rather than regex string matching." },
      { title: "Log Forwarder (Fluentd/Logstash)", description: "A lightweight agent running on every server tails the output of your containers and ships it across the network to the central index." },
      { title: "Storage & Indexing (Elasticsearch)", description: "Millions of log events are stored and indexed for lightning-fast full-text search." },
      { title: "Correlation IDs", description: "When a request hits the API Gateway, it generates a unique ID (e.g., `req-99z`). This ID is passed in headers to every downstream microservice. Filtering logs by this ID shows the exact path of that specific request across the entire galaxy of services." },
    ],
    deepDive: [
      { title: "Metrics vs Logs vs Traces", content: "The Three Pillars of Observability. Logs: Detailed events with context (Who did what, stack traces). Too massive to keep forever. Metrics: Aggregated numbers over time (CPU=80%, Requests=500/s). Extremely cheap to store forever in Time-Series Databases (Prometheus). Used for Alerting. Traces: Timing data tracking a request's journey across services (Gateway took 10ms, DB took 200ms). Used for finding latency bottlenecks." },
      { title: "Log Levels & Sampling", content: "DEBUG, INFO, WARN, ERROR, FATAL. In dev, log everything. In massive production environments, logging everything (INFO) can consume petabytes of storage, costing more than the application servers themselves. Best practice: Only log WARN/ERROR in standard production, but dynamically switch specific services to DEBUG mode via feature flags when deeply investigating an active issue. Or employ 'Sampling'—only keep 1 out of every 100 INFO logs." },
      { title: "PII and Compliance", content: "Logs are notoriously leaky. An intern prints the entire Request Body to debug an issue, accidentally logging 50,000 credit card numbers and plaintext passwords to Elasticsearch. Central log forwarders must use scrubbing filters (regex replacing `password=*` with `***`) before the logs ever leave the local server." },
    ],
    whenToUse: [
      "Any application running on more than one server or container",
      "Whenever migrating to microservices or Kubernetes",
      "To meet SOC2/PCI compliance requiring audit trails of access",
    ],
    useCases: [
      "ELK Stack (Elasticsearch, Logstash, Kibana) for full text search of application logs",
      "Prometheus + Grafana for scraping and visualizing hardware/business metrics",
      "Datadog / Splunk for managed cloud observability",
    ],
    tradeoffs: {
      pros: [
        "Turns days of debugging into seconds of searching",
        "Correlation IDs reveal the true behavior of complex distributed architectures",
        "Structured logs can trigger automated security alerts",
      ],
      cons: [
        "Centralized logging consumes immense amounts of disk/memory and is expensive to host",
        "Agent overhead (CPU overhead forwarding logs out of the server)",
        "Risk of accidentally leaking sensitive PII into the log index",
      ],
    },
    realWorldExamples: [
      { company: "Elasticsearch", description: "Built exactly for this use case. Turns unstructured text into an inverted index, allowing sub-second searches across terabytes of log output." },
      { company: "The Twelve-Factor App", description: "States that logs should be treated as event streams. Apps should never concern themselves with routing or storing files, but simply write everything to stdout, letting log routers handle the rest." },
    ],
    relatedConcepts: ["health-checks", "microservices"],
    keyTakeaway: "Use Structured JSON logging. Always inject a Correlation ID. Metric for alerting, Logs for debugging, Traces for profiling.",
  },

  // ═══════════════════════════════════════
  // TRADEOFFS
  // ═══════════════════════════════════════
  {
    id: "system-tradeoffs",
    name: "Core Tradeoffs: Latency, Throughput, Memory, Accuracy",
    categoryId: "tradeoffs",
    difficulty: "intermediate",
    definition:
      "System design is the science of compromises. Optimizing any one variable (Latency, Throughput, Memory, Accuracy) almost always comes at the expense of another.",
    importance:
      "Blindly optimizing a system without understanding the business requirement leads to overly complex, expensive architectures. There is no 'perfect' system.",
    story:
      "A manager demands: 'I want a system that processes 100,000 transactions a second (Throughput), responds in 5 milliseconds (Latency), uses minimal RAM (Memory), and is 100% perfectly consistent with the database (Accuracy).' You tell them: 'Pick two.' Case 1: You want massive Throughput? You must batch events. Wait 10 seconds, group 5,000 events, write to DB once. Throughput goes through the roof! But Latency is destroyed—users wait 10 seconds. Case 2: You want sub-millisecond Latency? Cache everything in Redis. Read instantly. But RAM is expensive (high Memory footprint), and when the database updates, the cache is temporarily stale (low Accuracy). Case 3: You want perfect Accuracy? Your database locks the rows, performs the transaction, and writes to disk. Accuracy is 100%. But Latency is slow, and Throughput drops to 50 TPS. Engineering is pushing the sliders on a soundboard based on what the business actually cares about.",
    howItWorks: [
      { title: "Latency vs Throughput", description: "Latency is how long ONE request takes. Throughput is how many requests are handled per second. Batching increases throughput but worsens latency. Multi-threading improves throughput but adds context switching (slight latency)." },
      { title: "Memory vs Latency", description: "We trade space for time. Caching stores pre-computed results in memory so we don't spend time computing them. Uses heavy RAM, reduces latency." },
      { title: "Accuracy vs Latency", description: "Eventual consistency trades accuracy (stale reads) for raw speed and availability (no locking constraints)." },
      { title: "Throughput vs Accuracy", description: "Using UDP instead of TCP drops integrity checks (Accuracy) to allow massive packet blasting (Throughput)." },
    ],
    deepDive: [
      { title: "The Batching Phenomenon", content: "Why does batching increase throughput? Overhead. Opening a TLS and TCP connection, authenticating, and acknowledging a database write takes 50ms of overhead. The actual data write takes 1ms. If you write 1,000 times sequentially, you pay (50ms+1) * 1000 = 51,000ms. If you batch 1,000 records into one request, you pay 50ms + (1ms*1000) = 1,050ms. Throughput increased 50x! But the first event in the batch had to sit around waiting for the 999th event to arrive before it was processed. You traded Latency for Throughput." },
      { title: "Space-Time Tradeoff in Algorithms", content: "This is the computer science foundation of system design. Want to find if a user exists in a massive array? A full scan takes O(N) Time. Slow. Want it instantly? Put the users in a Hash Map. Time is O(1). Fast! But a Hash Map uses significantly more Space (Memory) to maintain its structure and avoid collisions. Adding an Index to a database is exactly this: consuming disk space to buy retrieval time." },
      { title: "CAP Theorem as a Tradeoff", content: "The CAP theorem is the ultimate tradeoff. During a network partition, you must trade Availability (answering the request) for Consistency (Accuracy). You cannot have both." },
    ],
    whenToUse: [
      "Prioritize Latency: User-facing UIs, high-frequency trading algorithms, VR headset tracking.",
      "Prioritize Throughput: Big data processing (Hadoop), nightly billing cycles, analytic log aggregation.",
      "Prioritize Memory: Edge devices, IoT sensors, mobile apps.",
      "Prioritize Accuracy: Financial ledgers, medical records, checkout flows.",
    ],
    useCases: [
      "Kafka batching messages (Trading Latency for Throughput)",
      "Database Indexes (Trading Space/Writes for Read Latency)",
      "CDN edge caching (Trading Consistency/Accuracy for Latency)",
    ],
    tradeoffs: {
      pros: [
        "Understanding tradeoffs allows you to justify architectural decisions to stakeholders",
        "Prevents over-engineering features that don't need real-time perfection",
      ],
      cons: [
        "Requires deep understanding of business requirements (Does this really need to be real-time?)",
      ],
    },
    realWorldExamples: [
      { company: "Amazon Cart", description: "Famously chose Availability over Consistency (Accuracy). During a database split, the cart allows you to add items. It's better to accidentally sell an item twice (and apologize later) than to block a million dollars in sales by throwing an error page." },
      { company: "Kafka Producer Config", description: "Developers explicitly tune this tradeoff in Kafka by setting `linger.ms` (wait X ms before sending to batch more events) and `batch.size`. Increasing both destroys latency but maxes throughput." },
    ],
    relatedConcepts: ["cap-theorem", "push-vs-pull"],
    keyTakeaway: "Tradeoffs are absolute. When someone asks for 'fast, cheap, and perfect', ask them which one they want to fail first.",
  },
  // ═══════════════════════════════════════
  // SYSTEM DESIGN PRACTICE
  // ═══════════════════════════════════════
  {
    id: "design-url-shortener",
    name: "Design a URL Shortener (TinyURL)",
    categoryId: "practice",
    difficulty: "beginner",
    definition:
      "A classic beginner system design interview question. The goal is to take a long URL, generate a short 7-character alias, store it, and redirect users who visit the alias.",
    importance:
      "This question tests your understanding of scale, hashing, base62 encoding, database choice, and HTTP redirects.",
    story:
      "The interviewer says: 'Design TinyURL'. You panic. Then you remember the recipe. First, establish constraints: 100M URLs generated per month, 1B reads per month. It's read-heavy (10:1 ratio). Second, capacity: 100M * 10 years = 12 billion records. If each record is 500 bytes, that's 6TB of data. Not huge! Third, the core logic: How do we generate the 7 characters? If we use Base62 (a-z, A-Z, 0-9), a 7-character string gives 62^7 = 3.5 trillion combinations. More than enough. Do we hash the URL? If we use MD5, it's too long. We have to truncate it, which causes collisions. A better way: Database Auto-Increment ID. First URL gets ID=100. Base62 encode '100' -> 'bX'. Second URL gets ID=101 -> 'bY'. It's guaranteed unique. But wait, a single single DB limits write speed. Okay, buy a Redis cluster to serve reads caching the URLs. Use a relational DB for the IDs, or use a distributed ID generator like Twitter Snowflake. You just designed TinyURL.",
    howItWorks: [
      { title: "Define API", description: "POST /api/v1/data/shorten (receives long_url). GET /{shortUrl} (redirects to long_url)." },
      { title: "Route Traffic", description: "Client hits API Gateway -> Load Balancer -> Web Server cluster." },
      { title: "Generate Alias", description: "Use an independent ID Generator Service (like Snowflake) or a pre-filled database of random keys to assign a unique integer." },
      { title: "Encode to String", description: "Convert the unique integer to a Base62 string (e-g., 10000 -> sE9). Save {alias: 'sE9', longUrl: '...', createdAt: ...} in the database." },
      { title: "Read & Redirect", description: "GET request hits server. Check Cache (Redis). If hit, return HTTP 301. If miss, query DB, update Cache, return 301." },
    ],
    deepDive: [
      { title: "Hash vs Base62 vs Pre-generation", content: "Hashing the Long URL (MD5) sounds good because the same Long URL always yields the same Short URL. But MD5 is 128-bit (too long), and if you truncate it to 7 chars, you get collisions. You have to query the DB to check for collisions on every write. Slow. Counter/Base62 is better: generate a unique ID (1, 2, 3) and convert to Base62. No collisions ever. The absolute best way at scale: Pre-generate millions of random 7-char strings in a standalone 'Key Generation Service' (KGS) holding them in memory. When a web server needs a key, it grabs one from KGS. Instant, zero collisions." },
      { title: "HTTP 301 vs 302 Redirect", content: "When the server returns the long URL, it sends an HTTP redirect status. 301 means 'Moved Permanently'. The browser caches it. The next time the user types the short URL, the BROWSER redirects them without ever hitting your server. Great for reducing server load! 302 means 'Found (Temporary)'. The browser hits your server every time. If you need to track analytics (how many times it was clicked), you MUST use 302. TinyURL uses 301 for speed; Bitly uses 302 for tracking." },
      { title: "Database Choice", content: "We need billions of rows, but the data is tiny (string to string map) and has no relationships (no JOINs). This is the perfect use case for a NoSQL Key-Value store like Amazon DynamoDB or Cassandra. Horizontal scaling is trivial, and reads/writes are sub-millisecond. A relational database (PostgreSQL) would work, but scaling it requires sharding, adding unnecessary complexity." },
    ],
    whenToUse: [
      "As a warm-up system design question",
      "To demonstrate understanding of hashing and caching strategies",
      "To discuss CAP theorem tradeoffs in read-heavy systems",
    ],
    useCases: [
      "Bit.ly, TinyURL, t.co (Twitter's shortener)",
      "SMS masking (shortening URLs to fit in 160-char texts)",
    ],
    tradeoffs: {
      pros: [
        "Highly scalable read architecture via heavy caching",
        "Base62 conversion is computationally trivial",
      ],
      cons: [
        "Analytics tracking (302 redirects) destroys cache efficiency and increases load",
        "Distributed ID generation creates a potential single point of failure (if KGS crashes)",
      ],
    },
    realWorldExamples: [
      { company: "Bitly", description: "Handles billions of URLs securely. They use a distributed Key Generation Service (Zookeeper coordinated) to distribute batches of IDs to app servers to encode." },
    ],
    relatedConcepts: ["redis-memcached", "sql-vs-nosql", "caching-strategies"],
    keyTakeaway: "Reads outnumber writes 100-to-1. Cache aggressively. Pre-generate keys or use distributed counters instead of hashing to avoid collision checking.",
  },
  {
    id: "design-twitter",
    name: "Design Twitter (Newsfeed)",
    categoryId: "practice",
    difficulty: "advanced",
    definition:
      "A classic architecture question focusing on 'Fan-out'. Users tweet, follow others, and view a timeline of tweets from people they follow.",
    importance:
      "Twitter touches on the deepest problems in distributed systems: The 'Celebrity Problem', extreme read-to-write ratios, and eventual consistency.",
    story:
      "It's 2012. You write a tweet. It saves to the `tweets` table. Easy. Then you click 'Home'. The database executes: `SELECT * FROM tweets WHERE user_id IN (SELECT following_id FROM follows WHERE user_id = ME) ORDER BY created_at DESC`. This JOIN involves joining a millions-row table against a billions-row table, sorting them, and returning the top 20. It takes 15 seconds. Twitter crashes. You need a new architecture: Pre-computation. When you tweet, the server doesn't just save it. It takes your tweet and literally copies it into the personal, pre-computed 'Timeline Cache' (Redis List) of every single person who follows you. When your mom logs in, her timeline is already built and sitting in RAM. She loads it in 5ms. This is 'Fan-out on Write'. Incredible for reads! But then Justin Bieber tweets. He has 100M followers. Your system tries to copy his tweet into 100M Redis lists simultaneously. The servers catch fire. You have discovered the Celebrity Problem.",
    howItWorks: [
      { title: "Post a Tweet", description: "Client POSTs to API. Load balancer -> Write API -> Save to DB. Send an event to Kafka: 'User X tweeted Y'." },
      { title: "Fan-out Service", description: "Workers consume the Kafka event. They query the social graph: 'Who follows User X?'. They get a list of user IDs." },
      { title: "Push to Timeline Cache", description: "The workers insert the Tweet ID into the Redis List (the 'Home Timeline') of every follower." },
      { title: "Read Timeline", description: "User opens app. Client GETs timeline. API reads the user's Redis List directly. O(1) fetch, sub-millisecond response." },
      { title: "Hybrid Merge (Celebrity Problem)", description: "For massive accounts, DO NOT Fan-out on Write. When a user opens their timeline, fetch their pre-computed Redis list, then separately fetch recent tweets from the 5 celebrities they follow, and merge them in memory on the fly." },
    ],
    deepDive: [
      { title: "Fan-out on Write (Push) vs Fan-out on Read (Pull)", content: "Fan-out on Write pushes the tweet to followers' caches instantly. Read is O(1). Write is O(Followers). Great for normal users. Fan-out on Read saves the tweet once. When a follower loads their feed, the system queries what the celebrity has tweeted recently. Write is O(1). Read is O(N). Because Twitter is heavily read-biased (1000 reads per 1 write), Fan-out on Write is the default. Modern architectures use a Hybrid approach: Push for 'normal' users, Pull for accounts with >1M followers." },
      { title: "Social Graph Storage", content: "Who follows who? A relational DB table `(follower_id, followee_id)` works initially, but querying 'Get all 5M followers of account X' locks rows and slows down. Graph databases (Neo4j) or highly optimized NoSQL stores (TAO at Facebook, FlockDB at Twitter) are used to traverse massive follower trees instantly." },
      { title: "Eventual Consistency is Acceptable", content: "If you tweet, does it matter if your follower in Japan sees it precisely 1.0 milliseconds later? No. If it takes 2 seconds for the Kafka workers to fan-out the tweet to their Redis list, the user experience is unaffected. Twitter timelines are the perfect application of Eventual Consistency. Financial transactions require ACID; social media just requires it to 'look right eventually'." },
    ],
    whenToUse: [
      "To test knowledge of NoSQL, Caching, and Message Brokers (Kafka)",
      "To discuss the tradeoffs between 'Pre-computation' and 'On-the-fly computation'",
    ],
    useCases: [
      "Any Newsfeed (Facebook, Instagram, LinkedIn)",
      "Activity Streams in SaaS (e.g., Jira issue recent activity feed)",
    ],
    tradeoffs: {
      pros: [
        "Fan-out on Write ensures extremely fast app load times (reads)",
        "Kafka queues ensure the write API never blocks, even during a viral tweet",
      ],
      cons: [
        "Heavy Redis infrastructure costs (storing a timeline for every user in RAM)",
        "The Hybrid approach requires extreme architectural complexity to merge feeds efficiently",
      ],
    },
    realWorldExamples: [
      { company: "Twitter", description: "Originally failed under the weight of database JOINs (the 'Fail Whale'). Rebuilt using exactly this Hybrid Fan-out architecture backed by Redis clusters and Kafka messaging." },
    ],
    relatedConcepts: ["push-vs-pull", "eventual-consistency", "caching-strategies", "event-streaming"],
    keyTakeaway: "Pre-compute heavy reads. Fan-out on Write for 99% of users. Fan-out on Read for celebrities. Pre-computation is the key to scale.",
  },
  {
    id: "design-whatsapp",
    name: "Design WhatsApp (Chat)",
    categoryId: "practice",
    difficulty: "advanced",
    definition:
      "Design a real-time messaging application with 1-on-1 chat, group chat, online status, and message persistence.",
    importance:
      "Tests understanding of persistent connections (WebSockets), message sequencing, presence tracking, and pushing vs polling.",
    story:
      "Unlike Twitter (Read-heavy) or YouTube (Bandwidth-heavy), WhatsApp is Connection-heavy. You have 2 billion users. They leave the app running in the background all day. That's 1 billion persistent, open TCP connections. Standard web servers (like Apache) assign one OS thread per connection. 1 billion threads would crash all the servers on earth. First, you need asynchronous servers (Erlang, Go, Netty) that can hold millions of idle WebSocket connections per server. Second, how does Alice message Bob? Alice's phone sends the message to her connected server. But Bob is connected to a completely different server in another country. Alice's server looks up Bob in a 'Connection Database' (Redis): 'Bob is on TCP Server #804'. Alice's server sends the message over internal RPC to Server #804. Server #804 pushes it down the open WebSocket to Bob. Bob's phone beeps. Total time: 50ms. Oh, and if Bob was offline? Save it in a queue, and the next time he opens the app, dump the queue to his phone.",
    howItWorks: [
      { title: "Establish Connection", description: "App opens. Connects via WebSocket to a Chat Server. The Chat Server registers `User=Bob, Server=NodeA` in a central Redis cache." },
      { title: "Send Message", description: "Alice sends text to her Chat Server. Server gives the message a sequential ID, ACKs Alice (single checkmark), and puts message in a Message Bus (Kafka)." },
      { title: "Routing", description: "A routing service pulls the message. Queries Redis: 'Where is Bob?'. Answer: NodeA. Forwards message to NodeA." },
      { title: "Delivery", description: "NodeA pushes the message down the WebSocket to Bob. Bob's app sends an ACK back to NodeA (double checkmark)." },
      { title: "Offline Handling", description: "If Bob is not in Redis (offline), the message stays in a database table or queue. When Bob connects, his phone pulls all pending messages." },
    ],
    deepDive: [
      { title: "Preserving Message Order", content: "If Alice sends 'Hello' then 'Bob', Bob must see 'Hello' then 'Bob'. In distributed systems, 'Bob' might route faster than 'Hello'. Solution: Sequence IDs. The server generates a monotonically increasing ID for the conversation before routing. The client UI uses these IDs to sort locally before rendering. Because multiple servers can't easily generate ordered IDs, we often use a dedicated NoSQL DB or let the client generate a local timestamp + UUID." },
      { title: "Presence Service (Online/Last Seen)", content: "To show 'Online', whenever a user connects, we set a Redis key with a 60-second TTL. The client sends a heartbeat ping every 30s to keep it alive. If the user force-closes the app, the heartbeat stops, the TTL expires, and they show as 'Offline'. A massive Pub/Sub infrastructure broadcasts these status changes to anyone who has Bob in their contacts list." },
      { title: "Push Notifications", content: "If iOS/Android apps are closed, the WebSocket is killed by the OS to save battery. The Chat Server cannot reach the phone directly. It MUST send an API payload to APNs (Apple Push Notification Service) or FCM (Firebase Cloud Messaging). Apple/Google maintains one master TCP connection to the device at the OS level, which wakes the app up to show the banner." },
    ],
    whenToUse: [
      "To test knowledge of WebSockets, Pub/Sub, and stateful architectures",
      "To discuss the difference between stateless APIs and stateful connection nodes",
    ],
    useCases: [
      "Slack, Facebook Messenger, Discord, Telegram",
      "Live customer support chats",
      "Real-time collaborative editors (Google Docs cursor tracking)",
    ],
    tradeoffs: {
      pros: [
        "WebSockets provide instant, two-way communication with no HTTP overhead",
        "Erlang/Go architectures can handle millions of concurrent connections cheaply",
      ],
      cons: [
        "Stateful chat nodes prevent simple Round-Robin load balancing; you must track who is connected where",
        "Deploying/restarting Chat servers drops 100,000 users simultaneously, causing connection storms when they all reconnect immediately",
      ],
    },
    realWorldExamples: [
      { company: "WhatsApp", description: "Originally built with just 50 engineers using Erlang. Erlang's lightweight processes allowed them to hold 2 million concurrent connections per single server." },
      { company: "Discord", description: "Uses Elixir (built on Erlang VM) for massive real-time presence processing, handling millions of voice/text websocket connections globally." },
    ],
    relatedConcepts: ["networking-protocols", "pub-sub", "message-queues"],
    keyTakeaway: "Chat architectures are Connection-Heavy, not CPU-Heavy. Track connections in a central cache, and push messages internally to the specific server holding the recipient's socket.",
  }
];

export function getConceptsByCategory(categoryId: string): Concept[] {
  return concepts.filter((c) => c.categoryId === categoryId);
}

export function getConceptById(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

export function searchConcepts(query: string): Concept[] {
  const lower = query.toLowerCase();
  return concepts.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.definition.toLowerCase().includes(lower) ||
      c.keyTakeaway.toLowerCase().includes(lower)
  );
}

export function getAllConcepts(): Concept[] {
  return concepts;
}
