import PrimaryButton from '@/components/atoms/Button/PrimaryButton';
import UpdateGearImage from '@/components/molecules/UpdateGearImage';
import UpdateGearLabel from '@/components/molecules/UpdateGearLabel';
import { GearFormValue } from '@/types';
import { gears } from '@prisma/client';
import { VFC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Select from '@/components/atoms/Select';
import GearCategory from '@/util/GearCategory';
import axios from 'axios';
import { useRouter } from 'next/router';
import { uploadImg } from '@/util/uploadImg';
import { getPublicUrl } from '@/util/getPublicUrl';
import { updateImg } from '@/util/updateImg';
import useToast from '@/hooks/useToast';
import SuccessToast from '@/components/atoms/Toast/SuccessToast';

type Props = {
  gearData: gears | null;
};

const UpdateGear: VFC<Props> = ({ gearData }) => {
  const { toastState, toggleToast, closeToast } = useToast();
  const methods = useForm<GearFormValue>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const route = useRouter();
  const gearId = Number(route.query.gearId);

  const updateGear = async (
    formData: GearFormValue,
    imgUrl: string | undefined | null
  ) => {
    const sendData = {
      category: formData.category,
      name: formData.name,
      maker: formData.maker,
      webUrl: formData.url ?? null,
      imgUrl: imgUrl ?? null,
    };
    const { data } = await axios.post('/api/update-gear', { sendData, gearId });
    data && toggleToast();
  };

  const onSubmit = async (
    data: GearFormValue,
    currentImgUrl: string | undefined | null
  ) => {
    if (data.img.length === 0) {
      // 画像は更新しない場合
      updateGear(data, currentImgUrl);
    }
    if (!currentImgUrl && data.img.length === 1) {
      // 新しく画像をアップロードする場合
      const { fileName } = await uploadImg(data, 'gears');
      const { publicUrl } = await getPublicUrl(fileName, 'gears');
      await updateGear(data, publicUrl);
    }
    if (currentImgUrl && data.img.length === 1) {
      // すでに存在する画像を更新する
      await updateImg('gears', currentImgUrl, data.img[0]);
      await updateGear(data, currentImgUrl);
    }
  };

  return (
    <div>
      <SuccessToast toastState={toastState} closeToast={closeToast}>
        Gearを更新しました
      </SuccessToast>
      <div className='bg-white p-2 py-12 rounded-md drop-shadow-md'>
        <div className='flex flex-col items-center space-y-6'>
          <h1 className='font-bold text-2xl'>Gearを編集</h1>
          <FormProvider {...methods}>
            <form
              className='space-y-8'
              onSubmit={handleSubmit((data) =>
                onSubmit(data, gearData?.imgUrl)
              )}
            >
              <div className='space-y-4'>
                <div className=' space-x-4 border-b border-x-gray-200 p-4'>
                  <label className='w-full'>
                    <span>Gearカテゴリー</span>
                    <Select options={GearCategory} registerName='category' />
                  </label>
                </div>

                <UpdateGearLabel defaultValue={gearData?.name} label='製品' />
                <UpdateGearLabel
                  defaultValue={gearData?.maker}
                  label='メーカー'
                />
                <UpdateGearLabel
                  defaultValue={gearData?.webUrl ?? undefined}
                  label='製品Url'
                />
                <div>
                  <UpdateGearImage
                    gearImageUrl={gearData?.imgUrl ?? undefined}
                  />
                </div>
              </div>

              <PrimaryButton buttonType='submit' isLoading={isSubmitting}>
                確定
              </PrimaryButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default UpdateGear;
