import { Type } from "@domain/entities/pokemon/value-objects";

interface TypesListProps {
  typesList: Type[];
}

export function TypesList({ typesList }: TypesListProps) {
  return (
    <ul className="flex justify-around">
      {typesList.map((type) => (
        <li
          key={type.name}
          className={`
            p-[10px] 
            rounded-md 
            text-[10px] 
            mr-2 
            last:mr-0 
            ${type.name}
          `}
        >
          <span
            className={`
              font-bold brightness-[.40] 
              ${`text-${type.name}`} 
              bolder-in-small-text
            `}
          >
            {type.name.toUpperCase()}
          </span>
        </li>
      ))}
    </ul>
  );
}
