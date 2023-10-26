import RangeComponent from "@/components/analyzerComponents/rangeComponent";
import TextComponent from "@/components/analyzerComponents/textComponent";
import BoolComponent from "@/components/analyzerComponents/boolComponent";

const renderMetrics = (report: any, metric_metadata: any) => {
  const metrics = JSON.parse(report.report); // Convert the report string to an object.
  const metadata = metric_metadata[report.analyzer]; // Find the corresponding metadata.

  return Object.entries(metrics).map(([keyName, value]) => {
    const metricMetadata = metadata.find((m: any) => m.key_name === keyName);

    if (!metricMetadata) {
      return null; // If there's no metadata for a metric, don't render a component.
    }

    switch (metricMetadata.value_type) {
      case "range":
        const extendedMetadata = JSON.parse(metricMetadata.extended_metadata);
        return (
          <RangeComponent
            keyName={keyName}
            value={value as number}
            fromValue={extendedMetadata.fromRange}
            toValue={extendedMetadata.toRange}
          />
        );
      case "text":
        return <TextComponent keyName={keyName} value={value as string} />;
      case "bool":
        return <BoolComponent keyName={keyName} value={value as boolean} />;
      default:
        return null; // If the value_type is not recognized, don't render a component.
    }
  });
};
