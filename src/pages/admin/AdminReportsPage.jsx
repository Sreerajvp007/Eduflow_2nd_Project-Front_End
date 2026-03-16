import {
  Card,
  Title,
  Text,
  Loader,
  Progress,
  Group
} from "@mantine/core";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAnalytics } from "../../features/admin/adminAnalyticsSlice";

export default function AdminReportsPage() {

  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state) => state.adminAnalytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading || !data) {
    return (
      <div className="flex justify-center p-10">
        <Loader />
      </div>
    );
  }

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  /* ================= DATA ================= */

  const revenueData = data.monthlyRevenue?.map(item => ({
    month: months[item._id - 1],
    revenue: item.revenue
  })) || [];

  const purchaseData = data.purchases?.map(item => ({
    month: months[item._id - 1],
    courses: item.courses
  })) || [];

  const maxTutorSubject =
    Math.max(...(data.tutorSubjects?.map(s => s.count) || [1]));

  const maxSubjectDemand =
    Math.max(...(data.subjectDemand?.map(s => s.count) || [1]));

  const currentMonthRevenue =
    revenueData.length > 0
      ? revenueData[revenueData.length - 1].revenue
      : 0;

  return (

    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

      {/* ================= PAGE TITLE ================= */}

      <div>
        <Title order={3}>Analytics Dashboard</Title>
        <Text size="sm" c="dimmed">
          Overview of platform performance
        </Text>
      </div>

      {/* ================= STAT CARDS ================= */}

     {/* ================= STAT CARDS ================= */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

<Card
radius="md"
shadow="sm"
p="md"
withBorder
>

<Text size="xs" c="dimmed">
Total Revenue
</Text>

<Text fw={600} size="lg">
₹{data.totalRevenue}
</Text>

</Card>


<Card
radius="md"
shadow="sm"
p="md"
withBorder
>

<Text size="xs" c="dimmed">
Monthly Revenue
</Text>

<Text fw={600} size="lg">
₹{currentMonthRevenue}
</Text>

</Card>


<Card
radius="md"
shadow="sm"
p="md"
withBorder
>

<Text size="xs" c="dimmed">
Avg Tutor Rating
</Text>

<Text fw={600} size="lg">
⭐ {data.avgTutorRating}
</Text>

</Card>


<Card
radius="md"
shadow="sm"
p="md"
withBorder
>

<Text size="xs" c="dimmed">
Top Subject
</Text>

<Text fw={600} size="lg">
{data.topSubject}
</Text>

</Card>

</div>
      {/* ================= CHART GRID ================= */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= REVENUE GRAPH ================= */}

        <Card radius="lg" shadow="sm" p="lg">

          <Group justify="space-between" mb="md">

            <Text fw={600}>
              Revenue by Month
            </Text>

          </Group>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={revenueData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4F46E5"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </Card>

        {/* ================= PURCHASE GRAPH ================= */}

        <Card radius="lg" shadow="sm" p="lg">

          <Text fw={600} mb="md">
            Course Purchases
          </Text>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={purchaseData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="courses"
                fill="#10B981"
                radius={[6,6,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </Card>

        {/* ================= TUTOR SUBJECT DISTRIBUTION ================= */}

        <Card radius="lg" shadow="sm" p="lg">

          <Text fw={600} mb="md">
            Tutor Subjects Distribution
          </Text>

          {data.tutorSubjects?.map(subject => {

            const percent = (subject.count / maxTutorSubject) * 100;

            return (

              <div key={subject._id} className="mb-4">

                <div className="flex justify-between mb-1">

                  <Text size="sm">
                    {subject._id}
                  </Text>

                  <Text size="sm">
                    {subject.count}
                  </Text>

                </div>

                <Progress
                  value={percent}
                  radius="xl"
                  color="indigo"
                />

              </div>

            );

          })}

        </Card>

        {/* ================= SUBJECT DEMAND ================= */}

        <Card radius="lg" shadow="sm" p="lg">

          <Text fw={600} mb="md">
            Subject Demand
          </Text>

          {data.subjectDemand?.map(s => {

            const percent = (s.count / maxSubjectDemand) * 100;

            return (

              <div key={s._id} className="mb-4">

                <div className="flex justify-between mb-1">

                  <Text size="sm">
                    {s._id}
                  </Text>

                  <Text size="sm">
                    {s.count}
                  </Text>

                </div>

                <Progress
                  value={percent}
                  radius="xl"
                  color="indigo"
                />

              </div>

            );

          })}

        </Card>

      </div>

    </div>

  );
}