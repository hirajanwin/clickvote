import ActiveLink from '@clickvote/frontend/helper/active.link';
import { UserFromRequest } from '@clickvote/interfaces';
import { useContext } from 'react';
import { UserContext } from '@clickvote/frontend/helper/user.context';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { Select } from '@clickvote/frontend/components/form/select';
import { setCookie } from 'cookies-next';

type FormValues = {
  org: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.org ? values : {},
    errors: {},
  };
};

const LeftMenu = () => {
  const user: UserFromRequest | undefined = useContext(UserContext);
  const methods = useForm<FormValues>({
    mode: 'all',
    values: {
      org: user?.currentOrg?.id || '',
    },
    resolver,
  });

  const submit = (data: FormValues) => {
    setCookie('org', data.org);
    window.location.reload();
  };

  return (
    <div className="border border-[#ffffff]/20 px-4 w-60 bg-gradient-to-r from-[#212226] via-[#212226]/95 to-[#212226]/90 flex flex-col">
      <div className="flex-1 flex flex-col">
        <ActiveLink
          activeClassName="underline font-bold"
          href="/analytics"
          className="py-4"
        >
          Analytics
        </ActiveLink>
        <ActiveLink
          activeClassName="underline font-bold"
          href="/votes"
          className="py-4"
        >
          Votes
        </ActiveLink>
        <ActiveLink
          activeClassName="underline font-bold"
          href="/settings"
          className="py-4"
        >
          Settings
        </ActiveLink>
      </div>
      <div>
        <FormProvider {...methods}>
          <form>
            <Select
              name="org"
              label="Organization"
              postChange={methods.handleSubmit(submit)}
            >
              {user?.org.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </Select>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LeftMenu;
