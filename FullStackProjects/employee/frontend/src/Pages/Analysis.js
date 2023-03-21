import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { errorHandler } from "../actions";
import settyl from "../api/settyl";
import ChartComponent from "../components/ChartComponent";
import Spinner from "../components/Spinner";
const Analysis = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await settyl.get("/data");
        console.log("\x1b[35m", "👉👉👉 data :", data.statusData);
        setData(data);
      } catch (err) {
        dispatch(errorHandler(err));
      }
    };
    fetchData();
  }, []);

  const backgroundColorArrayForStatus = ["red", "blue", "orange"];

  const statusLabels = data?.statusData?.map((status) => status.status);

  const dataForEachStatusLabel = data?.statusData?.map(
    (status) => status.statusCount
  );

  const backgroundColorArrayForDepartment = [
    "red",
    "yellow",
    "orange",
    "green",
    "blue",
  ];
  const departmentLabels = data?.departmentData?.map(
    (department) => department.department
  );

  const dataForEachDepartmentLabel = data?.departmentData?.map(
    (department) => department.departmentCount
  );

  const renderDataCard = data?.departmentData?.map((department) => {
    return (
      <div
        key={department.department}
        className="w-1/3 h-full border-2 rounded-xl p-2 flex flex-col justify-center items-center shadow-xl"
      >
        <div className="text-xl">{department.department}</div>
        <div className="text-7xl text-blue-500 font-semibold cursor-pointer">
          {department.departmentCount}
        </div>
      </div>
    );
  });

  const renderCharts = [
    <ChartComponent
      chartHeading={"Status Data"}
      dataForEachLabel={dataForEachStatusLabel}
      labels={statusLabels}
      labelHeading={"Status Count"}
      backgroundColorArray={backgroundColorArrayForStatus}
    />,
    <ChartComponent
      chartHeading={"Department Data"}
      backgroundColorArray={backgroundColorArrayForDepartment}
      dataForEachLabel={dataForEachDepartmentLabel}
      labels={departmentLabels}
      labelHeading={"Department Count"}
    />,
  ].map((element) => (
    <div className="w-1/2 h-full border-2 rounded-lg shadow-xl flex justify-center">{element}</div>
  ));

  return data ? (
    <div className="p-2  h-screen">
      <div className="h-1/3  flex flex-col">
        <div className="h-1/6 px-3 text-3xl font-bold">
          Total employees : {data ? data.totalEmployees : null}
        </div>
        <div className="grow flex items-end p-4 gap-5"> {renderDataCard}</div>
      </div>
      <div className="h-2/3  flex gap-5 p-4">{renderCharts}</div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Analysis;
