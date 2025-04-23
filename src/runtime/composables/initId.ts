import { useId, provide } from "vue"
import { uuid } from "../services/utils/uuid"

interface UseFormId {
    Params: {
        idModel: Ref<string>
    }
    Return: Ref<string>
}

export const useFormId: Func<UseFormId> = (P) => {
    const { idModel } = P

    const instanceId = useId()
    const id = useState<string>(`form-${instanceId}`, () => uuid())

    idModel.value = id.value

    provide<Ref<string>>(`form-id`, id)

    return id
}

interface UseInputId {
    Params: {
        idModel: Ref<string>
        groupId: Ref<string | null>
        formId: Ref<string>
    }
    Return: Ref<string>
}

export const useInputId: Func<UseInputId> = (P) => {
    const { idModel, groupId, formId } = P

    const instanceId = useId()
    const id = useState<string>(`input-${instanceId}`, () => {
        return uuid({ id: groupId.value || formId.value, add: "input" })
    })

    idModel.value = id.value

    provide<Ref<string>>(`input-id`, id)

    return id
}

interface UseGroupId {
    Params: {
        idModel: Ref<string>
        formId: Ref<string>
    }
    Return: Ref<string>
}

export const useGroupId: Func<UseGroupId> = (P) => {
    const { idModel, formId } = P

    const instanceId = useId()
    const id = useState<string>(`group-${instanceId}`, () => {
        return uuid({ id: formId.value, add: "group" })
    })

    idModel.value = id.value

    provide<Ref<string>>(`group-id`, id)

    return id
}
