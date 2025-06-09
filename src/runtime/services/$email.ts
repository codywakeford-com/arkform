import { $tasks } from "../arkfire/$tasks"

/**Ark labs email client. */
export const $email = {
    send: async (body: any) => {
        $tasks.create({
            request: {
                url: "https://emailmicroservice-ststypyi7q-uc.a.run.app/api/send",
                method: "post",
                headers: {
                    Authorization: "Bearer dbf6f35a-af4d-40b7-bd14-848755d2cb93",
                },
                body: {
                    to: ["codypwakeford@gmail.com"],
                    from: "cody@codywakeford.com",
                    subject: "hello from task runner!!! muda bitch!",
                    message: "hello again",
                },
            },
            performAt: 1748781952430,
            status: "pending",
            retries: 3,
            key: "123",
        })
    },
}
