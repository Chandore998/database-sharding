# Database Sharding

Exploring database sharding patterns, shard keys, and scaling trade-offs in distributed systems.

## What is Sharding?

Sharding is a database scaling technique where data is **horizontally partitioned** across multiple databases (called *shards*).  
Each shard stores **only a subset of the total data**, allowing the system to scale by distributing load across multiple database instances.

## In Simple Terms

Sharding splits a large table into smaller pieces and spreads them across multiple databases.  
The application is responsible for deciding **which shard** a record belongs to and routing queries accordingly.


---

## Why Sharding is Needed

As applications grow, a single database can become a bottleneck due to limitations in CPU, memory, storage, and concurrent connections.

Sharding becomes necessary when:
- Data volume exceeds the capacity of a single database
- Read and write traffic increases significantly
- Vertical scaling (larger machines) is no longer sufficient or cost-effective
- High availability and fault isolation are required

By distributing data across multiple shards, systems can **scale horizontally** and handle large workloads more reliably.

---

## Common Sharding Strategies

### 1. Range-Based Sharding
Data is divided into shards based on a range of values, such as user IDs or timestamps.

**Example:**
- User IDs 1–1,000,000 → Shard A  
- User IDs 1,000,001–2,000,000 → Shard B  

**Pros**
- Simple to implement
- Easy to reason about

**Cons**
- Risk of uneven data distribution
- Hot shards when access patterns are skewed

---

### 2. Hash-Based Sharding
A hash function is applied to the shard key to determine which shard stores the data.

**Example:**
shard = hash(user_id) % number_of_shards

**Pros**
- More even data distribution
- Reduces hot spots

**Cons**
- Difficult to rebalance when adding or removing shards

---

### 3. Directory-Based Sharding
A lookup table is used to map shard keys to specific shards.

**Example:**
- user_id 101 → Shard A  
- user_id 102 → Shard C  

**Pros**
- Flexible shard placement
- Easier to rebalance data

**Cons**
- Additional lookup overhead
- Increased operational complexity

---

## Trade-offs and Challenges

While sharding enables scalability, it introduces complexity.

**Challenges include:**
- Cross-shard queries and joins
- Distributed transactions
- Data rebalancing and resharding
- Increased operational overhead

Sharding should be used only when simpler scaling approaches are no longer sufficient.

---

## Scope of This Repository

This repository focuses on:
- Understanding sharding concepts
- Exploring common sharding strategies
- Learning when and when not to use sharding

It does **not** aim to provide a production-ready sharding framework.

---