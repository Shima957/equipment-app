import { Button } from '@/components/atoms/Button';
import { UpdateGearImage } from '@/components/molecules/UpdateGearImage';
import { GearFormValue } from '@/types';
import { gears } from '@prisma/client';
import { VFC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Select } from '@/components/atoms/Select';
import { GearCategory } from '@/util';
import axios from 'axios';
import { useRouter } from 'next/router';
import { uploadImg } from '@/util';
import { getPublicUrl } from '@/util';
import { updateImg } from '@/util';
import { useToast } from '@/hooks';
import { SuccessToast } from '@/components/atoms/Toast';
import { FormField } from '@/components/atoms/FormField';
import { Form } from '@/components/atoms/Form';
import { Input } from '@/components/atoms/Input';
import { compressionImg } from '@/util';

type Props = {
  gearData: gears | null;
};

export const UpdateGear: VFC<Props> = ({ gearData }) => {
  const { toastState, toggleToast, closeToast } = useToast();
  const methods = useForm<GearFormValue>();
  const {
    register,
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
      const { compressedImg } = await compressionImg(data.img[0]);
      const { fileName } = await uploadImg(compressedImg, 'gears');
      const { publicUrl } = await getPublicUrl(fileName, 'gears');
      await updateGear(data, publicUrl);
    }
    if (currentImgUrl && data.img.length === 1) {
      // すでに存在する画像を更新する
      const { compressedImg } = await compressionImg(data.img[0]);
      await updateImg('gears', currentImgUrl, compressedImg);
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
            <Form
              onSubmit={handleSubmit((data) =>
                onSubmit(data, gearData?.imgUrl)
              )}
            >
              <div className='space-y-4'>
                <FormField label='Gearカテゴリー'>
                  <Select
                    options={GearCategory}
                    registeration={register('category')}
                  />
                </FormField>

                <FormField label='製品'>
                  <Input
                    defaultValue={gearData?.name}
                    type='text'
                    registeration={register('name')}
                  />
                </FormField>

                <FormField label='メーカー'>
                  <Input
                    defaultValue={gearData?.maker}
                    type='text'
                    registeration={register('maker')}
                  />
                </FormField>

                <FormField label='製品Url'>
                  <Input
                    defaultValue={gearData?.webUrl ?? undefined}
                    type='text'
                    registeration={register('url')}
                  />
                </FormField>

                <div>
                  <UpdateGearImage
                    gearImageUrl={gearData?.imgUrl ?? undefined}
                  />
                </div>
              </div>

              <Button type='submit' isLoading={isSubmitting}>
                確定
              </Button>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
