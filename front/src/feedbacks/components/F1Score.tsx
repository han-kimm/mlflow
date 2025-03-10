import { Header, Spacer } from '@databricks/design-system';
import { css } from '@emotion/react';
import { useMemo, useState } from 'react';

interface PredictionData {
  id: string; // 샘플 ID
  label: string; // 모델이 예측한 라벨
  humanLabel?: string; // 실제 정답 라벨
}

const F1ScoreHeatmap = (props: { data: PredictionData[] }) => {
  // prop destruction
  const { data } = props;

  // lib hooks

  // state, ref hooks
  const [sortBy, setSortBy] = useState('class');
  const [aggregateScores, setAggregateScores] = useState({
    macro: 0,
    weighted: 0,
    micro: 0,
  });

  // query hooks

  // calculated values
  const calculateMetrics = useMemo(() => {
    // 클래스 목록 찾기 (humanLabel과 label에서 모든 고유한 클래스 추출)
    const classes = new Set<string>();
    data.forEach((item) => {
      if (item.label) classes.add(item.label);
      if (item.humanLabel) classes.add(item.humanLabel);
    });

    // 각 클래스에 대한 지표 계산
    const metrics = Array.from(classes).map((className) => {
      const truePositives = data.filter((item) => item.label === className && item.humanLabel === className).length;
      const falsePositives = data.filter((item) => item.label === className && item.humanLabel !== className).length;
      const falseNegatives = data.filter((item) => item.label !== className && item.humanLabel === className).length;
      const support = data.filter((item) => item.humanLabel === className).length;

      const precision = truePositives === 0 ? 0 : truePositives / (truePositives + falsePositives);
      const recall = truePositives === 0 ? 0 : truePositives / (truePositives + falseNegatives);
      const f1Score = precision === 0 || recall === 0 ? 0 : (2 * (precision * recall)) / (precision + recall);

      return {
        class: className,
        precision,
        recall,
        f1Score,
        support,
        truePositives,
        falsePositives,
        falseNegatives,
      };
    });

    const macroF1 = metrics.reduce((sum, item) => sum + item.f1Score, 0) / metrics.length;

    // 2. Weighted F1: 클래스 샘플 수에 가중치를 둔 F1 Score 평균
    const totalSamples = metrics.reduce((sum, item) => sum + item.support, 0);
    const weightedF1 = metrics.reduce((sum, item) => sum + item.f1Score * item.support, 0) / totalSamples;

    // 3. Micro F1: 모든 클래스의 TP, FP, FN을 합산한 후 계산
    const totalTP = metrics.reduce((sum, item) => sum + item.truePositives, 0);
    const totalFP = metrics.reduce((sum, item) => sum + item.falsePositives, 0);
    const totalFN = metrics.reduce((sum, item) => sum + item.falseNegatives, 0);

    const microPrecision = totalTP / (totalTP + totalFP);
    const microRecall = totalTP / (totalTP + totalFN);
    const microF1 =
      microPrecision === 0 || microRecall === 0
        ? 0
        : (2 * (microPrecision * microRecall)) / (microPrecision + microRecall);

    setAggregateScores({
      macro: macroF1,
      weighted: weightedF1,
      micro: microF1,
    });

    return metrics;
  }, [data]);

  const sortedData = useMemo(() => {
    if (sortBy === 'class') {
      return [...calculateMetrics].sort((a, b) => a.class.localeCompare(b.class));
    }
    // @ts-expect-error
    return [...calculateMetrics].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [calculateMetrics, sortBy]);

  const confusionMatrix = useMemo(() => {
    // 클래스 목록 (정렬된 순서로)
    const classes = sortedData.map((item) => item.class);

    // 혼동 행렬 초기화
    const matrix = Array(classes.length)
      .fill(0)
      .map(() => Array(classes.length).fill(0));

    // 혼동 행렬 채우기
    data.forEach((item) => {
      if (!item.label || !item.humanLabel) return;

      const actualIndex = classes.indexOf(item.humanLabel);
      const predictedIndex = classes.indexOf(item.label);

      if (actualIndex >= 0 && predictedIndex >= 0) {
        matrix[actualIndex][predictedIndex]++;
      }
    });

    return { classes, matrix };
  }, [data, sortedData]);

  // effects

  // handlers
  const getColorForValue = (value: number) => {
    // 연한 녹색에서 진한 녹색으로
    const t = (value - 0.75) / 0.25;
    const r = Math.round(105 - (105 - 27) * t);
    const g = Math.round(179 - (179 - 158) * t);
    const b = Math.round(76 - (76 - 73) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getTextColor = (value: number) => {
    return value > 0.5 ? 'white' : 'black';
  };

  return (
    <div
      css={css`
        max-width: 1000px;
      `}
    >
      <Header title="Evaluation with Human Feedback" />
      <Spacer size="sm" />
      <div
        css={css`
          margin-bottom: 20px;
        `}
      >
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          css={css`
            padding: 5px 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
          `}
        >
          <option value="f1Score">F1 Score</option>
          <option value="precision">Precision</option>
          <option value="recall">Recall</option>
          <option value="class">클래스명</option>
        </select>
      </div>

      <div
        css={css`
          overflow-x: auto;
        `}
      >
        <table
          css={css`
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          `}
        >
          <thead>
            <tr>
              <th
                css={css`
                  padding: 12px;
                  text-align: left;
                  border: 1px solid #ddd;
                  position: sticky;
                  left: 0;
                  z-index: 1;
                `}
              >
                클래스
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                Precision
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                Recall
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                F1 Score
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                Support
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                TP
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                FP
              </th>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                FN
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td
                  css={css`
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #ddd;
                    font-weight: bold;
                    position: sticky;
                    left: 0;
                    z-index: 1;
                  `}
                >
                  {item.class}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                    background-color: ${getColorForValue(item.precision)};
                    color: ${getTextColor(item.precision)};
                    font-weight: bold;
                  `}
                >
                  {item.precision.toFixed(3)}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                    background-color: ${getColorForValue(item.recall)};
                    color: ${getTextColor(item.recall)};
                    font-weight: bold;
                  `}
                >
                  {item.recall.toFixed(3)}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                    background-color: ${getColorForValue(item.f1Score)};
                    color: ${getTextColor(item.f1Score)};
                    font-weight: bold;
                  `}
                >
                  {item.f1Score.toFixed(3)}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                  `}
                >
                  {item.support}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                  `}
                >
                  {item.truePositives}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                  `}
                >
                  {item.falsePositives}
                </td>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                  `}
                >
                  {item.falseNegatives}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3
        css={css`
          margin-top: 30px;
          margin-bottom: 15px;
          color: #333;
        `}
      >
        혼동 행렬 (Confusion Matrix)
      </h3>

      <div
        css={css`
          overflow-x: auto;
          margin-bottom: 20px;
        `}
      >
        <table
          css={css`
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          `}
        >
          <thead>
            <tr>
              <th
                css={css`
                  padding: 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                `}
              >
                실제 ↓ / 예측 →
              </th>
              {confusionMatrix.classes.map((className, index) => (
                <th
                  key={index}
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                  `}
                >
                  {className}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {confusionMatrix.matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  css={css`
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                    font-weight: bold;
                  `}
                >
                  {confusionMatrix.classes[rowIndex]}
                </td>
                {row.map((cell, cellIndex) => {
                  // 대각선 요소(TP)인지 확인
                  const isTP = rowIndex === cellIndex;
                  // 각 행의 합계 (해당 클래스의 실제 샘플 수)
                  const rowSum = row.reduce((sum, val) => sum + val, 0);
                  // 셀 값의 비율 계산
                  const ratio = rowSum > 0 ? cell / rowSum : 0;

                  // 강조 색상: 대각선은 녹색 계열, 나머지는 파란색 계열
                  const bgColor = isTP ? `rgba(27, 158, 73, ${ratio})` : cell > 0 ? `rgba(220, 50, 0, ${ratio})` : '';

                  return (
                    <td
                      key={cellIndex}
                      css={css`
                        padding: 12px;
                        text-align: center;
                        border: 1px solid #ddd;
                        background-color: ${bgColor};
                        font-weight: ${isTP ? 'bold' : 'normal'};
                      `}
                    >
                      {cell} {rowSum > 0 && `(${(ratio * 100).toFixed(1)}%)`}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default F1ScoreHeatmap;
