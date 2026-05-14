interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface HeaderProps {
  header: string;
}

interface ContentProps {
  parts: CoursePart[];
}

interface TotalProps {
  totalExercises: number;
}

interface PartProps {
  part: CoursePart;
}

const Header = ({ header }: HeaderProps) => {
  return <h1>{header}</h1>;
};

const Part = ({ part }: PartProps) => {
  let partEl;
  switch (part.kind) {
    case "basic":
      partEl = (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
      break;
    case "group":
      partEl = (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
      break;
    case "background":
      partEl = (
        <p>
          {part.name} {part.exerciseCount} {part.description}{" "}
          {part.backgroundMaterial}
        </p>
      );
      break;
    case "special":
      partEl = (
        <div>
          {part.name} {part.exerciseCount} {part.description} required skills:{" "}
          <ul>
            {" "}
            {part.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      );
      break;
    default:
      return assertNever(part);
  }

  return partEl;
};

const Content = ({ parts }: ContentProps) => {
  return parts.map((p) => (
    <Part
      key={p.name}
      part={p}
    />
  ));
};

const Total = ({ totalExercises }: TotalProps) => {
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header header={courseName} />
      <Content parts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
