import { WithEngineInstance } from "components/engine/EnginePageLayout";
import { EngineSystemMetrics } from "components/engine/system-metrics";
import type { EngineInstancePageProps } from "../types";

export default async function Page(props: EngineInstancePageProps) {
  const params = await props.params;

  return (
    <WithEngineInstance
      engineId={params.engineId}
      content={(res) => <EngineSystemMetrics instance={res.instance} />}
      rootPath={`/team/${params.team_slug}/${params.project_slug}/engine`}
    />
  );
}
