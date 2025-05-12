# Arkfire

### Immediate
- [ ] docRef 
- [ ] colRef



Arkfire is a fully typesafe abstraction for firestore. After working with vue fire for a bit I thought I could take it to the next level. Now you can define a firestore schema and work with your data will full typesafety.

The idea is to basically make firestore reactive like a reactive ref and capture updates to the ref and keep firestore in sync. After defining your schema Arkfire will recognise firestore reference paths and understand the data structure your dealing with.

## Defining a schema

Somewhere in your application you need to instantiate your `firestore` function bag. You need to do this in order to pass your Schema type into the package. This object will give you access to `Arkfires`'s `fireRef` functions. 

```typescript
// Special structure for defining store type.
export type FirestoreSchema = {
    users: {
        // Type each doc in the `users`
        // collection should have
        $doc: {
            id: string
        }

        // Define collections each
        // document should have
        $collections: {
            emails: {
                $doc: {
                    email: string
                }
            }

            // ... More collections
        }
    }

    // .. More collections
} & FirestoreSchemaBase

// Inject your type here:
const firestore = defineFirestoreSchema<FirestoreSchema>()

// TS Output Examples
const user = firestore.docRef("users/123") // { id: string }
const users = firestore.colRef("users") // { id: string }[]

const usersEmails = firestore.colRef("users/123/emails") // { email: string }[]
const usersEmail = firestore.docRef("users/123/emails/123") // { email: string }
```

In the schema you start off defining set of collections. In the example above we specify the users collection. In the collection we specify `$doc` which is the type each document in user collection should be.

Optionally, you can specify collections each document should have and that is self is a Collection, so it works recursively like firestore does.

## Inferred Types

In the example above `users` would show the type specified as `users.$doc`, in this case `{ id: string }`.

## FireRef

A `fireRef` is a wrapper around the vue `ref()` function. It provides all the reactivity features from refs along with some extra helpers.

Here is an example of a `fireRef`. The fireRef provides a reactive ref to store data reactivly, in memory. Where as the set command will merge data into firestore at the document reference.

```typescript
type MyType = { id: string }

type FireDocRef = {
    value: MyType | null
    set: (data: Partial<MyType>) => void
    delete: () => void
}

type FireColRef = {
    value: MyType[]
    set: (data: MyType[])
    delete: (id: string) => void

}
```

```typescript
const user = firestore.docRef("users/123") // { id: string }
```

When accessing a `fireRef` your completely in sync with firestore with a reactive ref. Acess the value using `.value` and set the value using `.set()`.

```typescript
user.set({
    id: "Hello",
    roles: [123, 123, 123],
    nested: {
        nested: {
            bool: true,
        },
    },
})
```

When triggered this function will merge the data with firestore and update the ref. The set function will only ever add or overwrite data.

Things can be deleted using `firebase/firestore` `deleteField()`.

```typescript
import { deleteField } from "firebase/firestore"
const user = firestore.docRef("users/123")

user.set({
    id: "Hello",
    roles: deleteField(), // roles field removed from document
})
```

Or `arrayUnion()` and so on.

```typescript
import { arrayUnion } from "firebase/firestore"

user.set({
    id: "Hello",
    roles: arrayUnion(123, 123),
})
```

Also to delete a document you can use

```typescript
user.destroy()
```

### Using Refs

Creating a new document can be done simply creating a ref and setting a value.

```typescript
// Creates a ref
const newUser = firestore.docRef("user/newId123")

// Creates document in firestore and updates ref
newUser.set({
    id: "1234",
})
```

## Fuse.js

Hotwired it with Fuse.js. Now you can quickly search your data using the search function.

```typescript
const users = firestore.docRef("users") // { id: string, name: string }[]
const query = ref("")

const filteredUsers = users.search(query, {
    keys: ["id", "email"],
    threshold: 0.2,
})
```

## Joins

Bit of an experimental thing, I added auto joins in there too. If you specify a field value in firestore beginging with `$` and is a firebase path then the join will read automatically and populated in the ref.

```typescript
user.set({
    joinedDocument: "$otherDocuments/id_123",
})

// This will resolve to in your ref

user = {
    joinedDocument: {
        ...resolvedDocumentData,
    },
}

// fully reactive + typesafe
```

As a bonus you can write to this as well, that will be picked up by the fire ref and the appropriate document will be updated. So no need for duplication. Not really at the cost of any more reads either. Just watch out for the recursive case in prod.

Gonna give it a spin in a few projects and I'll see how it goes.
