export type DeepPartial<T> = {
  // For each property P in the original type T...
  [P in keyof T]?: // ...make the property P optional (`?`)

  // Check the type of the property's value (T[P])
  T[P] extends object // If the property's value is an object...
    ? DeepPartial<T[P]> // ...recursively call DeepPartial on that nested object type
    : T[P]; // ...otherwise (if it's a primitive like string, number, boolean, etc.), keep its original type.
};