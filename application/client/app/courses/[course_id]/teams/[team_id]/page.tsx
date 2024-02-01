interface Props {
  params: { course_id: string; team_id: string };
}

export default function TeamDetailsPage({ params }: Props) {
  return (
    <>
      <h2 className="h2">
        Details for team with id {params.team_id} in course with id{" "}
        {params.course_id}
      </h2>
      Not yet implemented ...
    </>
  );
}
