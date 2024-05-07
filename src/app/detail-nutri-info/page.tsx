'use client';

import React, { useState } from 'react';
import NutriChart from '@/app/detail-nutri-info/components/nutri-chart';
import NutriList from '@/app/detail-nutri-info/components/nutri-list';
import {
  DateRangeType,
  NutrientData,
} from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';
import useDetailNutriList from '@/app/detail-nutri-info/hooks/useDetailNutriList';
import { nutrientNameMapping } from '@/app/detail-nutri-info/constants/nutrientNameMapping';
import { Button } from '@/commons/components/ui/button';
import { useRouter } from 'next/navigation';

const DetailNutriInfoPage = () => {
  const [dateFilter, setDateFilter] = useState<DateRangeType>('DAY');

  const { data, isGetUserNutriDetailHistoryLoading } = useDetailNutriList(dateFilter);
  const { push } = useRouter();
  const carbohydrateRatio = Math.min(
    (data?.totalData?.carbohydrate / (data?.essentialNutrition.carbohydrate ?? 1)) * 100,
    100,
  );

  const proteinRatio = Math.min(
    (data?.totalData?.protein / (data?.essentialNutrition.protein ?? 1)) * 100,
    100,
  );

  const fatRatio = Math.min(
    (data?.totalData?.fat / (data?.essentialNutrition.fat ?? 1)) * 100,
    100,
  );
  const goToModiNurti = () => {
    push('/modi-nurti');
  };

  // TODO Loading 상태일 때 로딩 컴포넌트 추가하기
  if (isGetUserNutriDetailHistoryLoading) return <div>로딩중</div>;
  return (
    <>
    <div className="text-2xl font-bold mb-4 text-center ">상세 영양정보</div>
      <div className="border border-[#D9D9D9] rounded-lg pt-2">
      
        <div className="flex items-center p-5 px-4 gap-4 mb-2">
          <div
            className={`py-1 cursor-pointer flex justify-center items-center border-blue-400 border-[2px]  w-[160px] rounded-lg ${dateFilter === 'DAY' ? 'bg-blue-500 text-white border-none' : 'bg-transparent'}`}
            onClick={() => setDateFilter('DAY')}
          >
            일간
          </div>
          <div
            className={`py-1 cursor-pointer flex justify-center items-center border-blue-400 border-[2px] rounded-lg w-[160px] ${dateFilter === 'WEEK' ? 'bg-blue-500 text-white border-none' : 'bg-transparent'}`}
            onClick={() => setDateFilter('WEEK')}
          >
            주간
          </div>
          <div
            className={`py-1 cursor-pointer flex justify-center items-center border-blue-400 border-[2px]   rounded-lg w-[160px] ${dateFilter === 'MONTH' ? 'bg-blue-500 text-white border-none' : 'bg-transparent'}`}
            onClick={() => setDateFilter('MONTH')}
          >
            월간
          </div>
        </div>
        <div className="bg-white w-full  pt-4 flex flex-col items-center pb-6">
          <div className="text-[#FF9385] text-2xl">{dateFilter}</div>
          <div className="mb-10" />
          <div className="flex gap-4 flex-col items-center w-full mb-3">
            <NutriChart
              carbohydrateRatio={carbohydrateRatio}
              proteinRatio={proteinRatio}
              fatRatio={fatRatio}
            />
            <div className="mb-2" />
            <Button onClick={goToModiNurti} className="bg-[#FF9385]">
              오늘의 영양분 분석 수정하러 가기
            </Button>
            <div className="mb-2" />
            <div className="flex justify-around w-full mb-4">
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="text-[#FF9385] font-bold">탄수화물</div>
                <div>{Math.round(data?.totalData?.carbohydrate)}g</div>
              </div>
              <div className="flex flex-col items-center max-w-[80px] w-full">
                <div className="text-[#FF9385] font-bold">단백질</div>
                <div>{Math.round(data?.totalData?.protein)}g</div>
              </div>
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="flex flex-col items-center">
                  <div className="text-[#FF9385] font-bold">지방</div>
                  <div>{Math.round(data?.totalData?.fat)}g</div>
                </div>
              </div>
            </div>
          </div>
        <NutriList energy={data.totalData.energy}>
          {Object.entries(data.totalData).map(([key, value]) => {
            // 사용자가 섭취한 영양소의 양과 권장 영양소의 양을 가져옵니다.
            const consumed = Math.round(value); // 사용자가 섭취한 양
            const 권장영양소 = data.essentialNutrition;
            const recommended = 권장영양소[key as keyof NutrientData]
              ? Math.round(권장영양소[key as keyof NutrientData])
              : '정보 없음'; // 권장량, 없다면 "정보 없음" 표시
            return (
              <NutriList.Item key={key}>
                <div className=" w-[100px] text-center font-bold">{nutrientNameMapping[key] || key}</div>{' '}
                {/* 영양소 이름 */}
                <div className="w-[100px] text-center"> {consumed}</div>{' '}
                {/* 사용자가 섭취한 영양소의 양 */}
                <div className="w-[100px] text-center">{recommended}</div> {/* 권장 영양소의 양 */}
              </NutriList.Item>
            );
          })}
        </NutriList>
        </div>
      </div>
    </>
  );
};

export default DetailNutriInfoPage;
