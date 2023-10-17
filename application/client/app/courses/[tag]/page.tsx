import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import RangeComponent from "@/components/analyzerComponents/rangeComponent";
import TextComponent from "@/components/analyzerComponents/textComponent";
import BoolComponent from "@/components/analyzerComponents/boolComponent";

interface Props {
  params: { tag: string };
}
type RangeMetric = {
  keyName: string;
  valueType: "range";
  fromValue: number;
  toValue: number;
  value: number;
};

type TextMetric = {
  keyName: string;
  valueType: "text";
  value: string;
};

type BoolMetric = {
  keyName: string;
  valueType: "bool";
  value: boolean;
};

type Metric = RangeMetric | TextMetric | BoolMetric;

export default async function CourseHomePage({ params }: Props) {
  // const courseInfo = await prisma.course.findFirst({
  //   where: { tag: params.tag },
  // });

  const metrics: Metric[] = [
    {
      keyName: "Accessability",
      valueType: "range",
      fromValue: 0,
      toValue: 100,
      value: 87,
    },
    {
      keyName: "hasViewport",
      valueType: "bool",
      value: true,
    },
    {
      keyName: "hasHTTPS",
      valueType: "bool",
      value: false,
    },
    {
      keyName: "Minimize main-thread work",
      valueType: "text",
      value:
        "Consider reducing the time spent parsing, compiling and executing JS.",
    },
  ];
  return (
    <main className={styles.main}>
      <h2>Start page for {params.tag}</h2>

      <br />
      <div className="">
        {metrics.map((metric) => {
          switch (metric.valueType) {
            case "range":
              return (
                  <RangeComponent
                    keyName={metric.keyName}
                    value={metric.value}
                    fromValue={metric.fromValue}
                    toValue={metric.toValue}
                  />
              );
            case "text":
              return (
                  <TextComponent
                    keyName={metric.keyName}
                    value={metric.value}
                  />
              );
            case "bool":
              return (
                  <BoolComponent
                    keyName={metric.keyName}
                    value={metric.value}
                  />
              );
          }
        })}
      </div>
    </main>
  );
}
